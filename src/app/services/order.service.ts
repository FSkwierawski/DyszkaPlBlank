import { IdentityService } from './identity.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class OrderService {

  private ordersUrl = 'https://Localhost:5001/api/orders/';
  headers: HttpHeaders;

  constructor(
      private httpClient: HttpClient,
      private identityService: IdentityService) {
          this.headers = new HttpHeaders({
              Authorization: `Bearer ${this.identityService.getAccesToken()}`
          });
  }

  public getCreatedByCurrentUser(page: number) {
      const headers = this.headers;
      return this.httpClient.get(`${this.ordersUrl}user-orders/${page}`, {headers});
  }

  public getOrdersForCurrentUserOffers(page: number, done: boolean) {
      const headers = this.headers;
      return this.httpClient.get(`${this.ordersUrl}user-offers/${page}/${done}`, {headers});
  }

  public markAsDone(id: string) {
    const headers = this.headers;
    return this.httpClient.post(`${this.ordersUrl}${id}/done`, {}, {headers}).pipe(map((result) => {
        console.log('ok');
        return result;
      }),
      catchError((error) => {
        console.log('error');
        return error;
      }));
  }
}
