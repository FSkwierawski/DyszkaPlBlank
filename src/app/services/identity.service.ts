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
    private router: Router
  ) {
    this.accessToken$.subscribe(token => {
      localStorage.setItem(Config.localStorageAccessTokenKey, token);
      if (token) {
        const decodedToken = decodeJwt(token);
        this.user$.next(new UserBuilder(this.user$.value).addIdentityData(decodedToken).build());
        console.log.apply(this.user$);
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
      console.log(response);
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
  }, error => {
    this.accessToken$.next('');
  });
}

public logout() {
  this.accessToken$.next('');
  this.user$.next(null);
  this.refreshToken$.next('');
  this.router.navigateByUrl('/');
}



}


