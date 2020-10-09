import { AlertController } from '@ionic/angular';
import { UserBuilder } from './../model/User.builder';
import { Router } from '@angular/router';
import { Config } from './../Config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/User';
import * as decodeJwt from 'jwt-decode';




@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  public currentUser$ = new BehaviorSubject<string>(null);
  public user$ = new BehaviorSubject<User>(null);
  private accessToken$ = new BehaviorSubject<string>(localStorage.getItem(Config.localStorageAccessTokenKey) || '');
  private accessTokenExpirationTimestamp: number;
  private refreshToken$ = new BehaviorSubject<string>(localStorage.getItem(Config.localStorageRefreshTokenKey) || '');
  private refreshingToken = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertController: AlertController
  ) {
    this.accessToken$.subscribe(token => {
      localStorage.setItem(Config.localStorageAccessTokenKey, token);
      if (token) {
        const decodedToken = decodeJwt(token);
        this.user$.next(new UserBuilder(this.user$.value).addIdentityData(decodedToken).build());
      }
    });
   }


public register(username: string, password: string, confirmPassword: string) {
  this.httpClient.post(Config.identityServerUrl + 'api/identity/register',
    {
      UserName: username,
      Password: password,
      ConfirmPassword: confirmPassword
    }).subscribe(response => {
      this.registrationSucceed();
    }, error => {
      this.registrationAlert();
    });
}

public logIn(username: string, password: string) {
  this.currentUser$.next(username);
  const body = new HttpParams()
    .set('username', username)
    .set('password', password)
    .set('client_id', Config.clientId)
    .set('client_secret', Config.clientSecret)
    .set('scope', Config.clientScopes)
    .set('grant_type', 'password');

  this.httpClient.post(Config.identityServerUrl + 'connect/token',
    body.toString(), {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  }).subscribe(response => {
    this.accessToken$.next(response['access_token']);
    this.refreshToken$.next(response['refresh_token']);
    console.log(this.user$);
    this.router.navigateByUrl('/offer-screen');
  }, error => {
    this.accessToken$.next('');
    this.loginErrorAlert();

  });
}

public logout() {
  this.accessToken$.next('');
  this.user$.next(null);
  this.refreshToken$.next('');
  this.router.navigateByUrl('/');
}

public getAccesToken() {
  return this.accessToken$.value;
}

async loginErrorAlert() {
  const alert = await this.alertController.create({
    header: 'Błąd!',
    message: 'Coś poszło nie tak, spróbuj ponownie',
    buttons: [
      {
        text: 'Ok',
        handler: () => {
          this.logout();
        }
      }
    ]
  });
  await alert.present();
}

  async registrationAlert() {
    const alert = await this.alertController.create({
      header: 'Uwaga!',
      subHeader: 'Błąd rejestacji',
      message: 'hasło musi mieć conajmniej 6 znaków i zawierać conajmniej 1 cyfrę',
      buttons: [
        {
          text: 'Ok',
        },
      ]
    });
    await alert.present();
  }

  async registrationSucceed() {
    const alert = await this.alertController.create({
      header: 'Witaj!',
      subHeader: 'Twoje konto zostało utworzone',
      message: 'Możesz teraz zalogować się do serwisu dyszkaPl!',
      buttons: [
        {
          text: 'Ok',
        },
      ]
    });
    await alert.present();
  }


}


