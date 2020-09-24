import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { IdentityService } from './identity.service';

@Injectable()
export class CommentService {
  private commentsUrl = `https://localhost:5001/api/comments`;

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

    return this.httpClient.post(this.commentsUrl, comment, {headers}).subscribe(
      map((result) => {
        return result;
      }),
      catchError((error) => {
        return error;
      })
    );
  }

  public deleteComment(id: string) {
    return this.httpClient.delete(this.commentsUrl + id).pipe(
      map((result) => {
        return result;
      }),
      catchError((error) => {
        return error;
      })
    );
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
