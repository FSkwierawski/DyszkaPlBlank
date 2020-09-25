import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { IdentityService } from './identity.service';

@Injectable()
export class CommentService {
  private commentsUrl = `https://localhost:5001/api/comments/`;

  constructor(
      private httpClient: HttpClient,
      private identityService: IdentityService) {}

  public getPagedAndFiltered(
    page: number,
    profileUserName?: string,
    offerId?: string
  ) {
    var query = `${this.commentsUrl}?page=${page}`;
    if (profileUserName) {
      query = query.concat(`&profileUsername=${profileUserName}`);
    }
    if (offerId) {
      query = query.concat(`&offerId=${offerId}`);
    }
    return this.httpClient.get(query);
  }

  public addComment(comment) {
    const headers = new HttpHeaders({
        Authorization: `Bearer ${this.identityService.getAccesToken()}`
    });

    return this.httpClient.post(this.commentsUrl, comment, {headers}).pipe(
      map((result) => {
        console.log('dodanie kom');
        return result;
      }),
      catchError((error) => {
        console.log('błąd dodania kom');
        return error;
      })
    );
  }

  public deleteComment(id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.identityService.getAccesToken()}`
    });
    return this.httpClient.delete(this.commentsUrl + id, {headers});
  }

  public setToPositive(id: string) {
    return this.httpClient.put(this.commentsUrl + id + "/toPositive", {}).pipe(
      map((result) => {
        return result;
      }),
      catchError((error) => {
        return error;
      })
    );
  }
}
