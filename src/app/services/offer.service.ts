import { IdentityService } from './identity.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class OfferService {
  private offerUrl = `https://Localhost:5001/api/offers/`;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private identityService: IdentityService) {}

  public getById(id: string) {
    const a = this.httpClient.get(`${this.offerUrl}${id}`);
    console.log(a);
    return this.httpClient.get(`${this.offerUrl}${id}`);
  }

  public getPaged(page: number, username?: string, tags?: string[]) {
    let url = `${this.offerUrl}?page=${page}`;
    if (username) {
      url = url.concat(`&username=${username}`);
    }
    if (tags) {
      tags.forEach((tag) => (url = url.concat(`&tags=${tag}`)));
    }
    return this.httpClient.get(url);
  }

  public addOffer(offer) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.identityService.getAccesToken()}`
  });
    this.httpClient.post(this.offerUrl, offer, {headers}).subscribe(
      (result) => {
        this.router.navigateByUrl(`/offer/${result}`);
      },
      () => {
      }
    );
  }

  public showOffer(id: string) {
    return this.httpClient.put(`${this.offerUrl}${id}/show`, {}).pipe(
      map(() => {
      }),
      catchError((error) => {
        return error;
      })
    );
  }

  public hideOffer(id: string) {
    return this.httpClient.put(`${this.offerUrl}${id}/hide`, {}).pipe(
      map(() => {
        // this.snackBar.open('Schowano ofertę');
      }),
      catchError((error) => {
        // this.snackBar.open('Błąd podczas chowania oferty', '', { duration: 2000 });
        return error;
      })
    );
  }

  public orderOffer(id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.identityService.getAccesToken()}`
  });
    this.httpClient.post(`${this.offerUrl}${id}/order`, {}, {headers}).
      subscribe(() => console.log('złożono zamówienie'));
  }
}
