import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { IdentityService } from './identity.service';

@Injectable()
export class MessageService {
  private messagesUrl = "https://Localhost:5001/api/messages/";
  headers: HttpHeaders;

  constructor(
    private httpClient: HttpClient,
    private identityService: IdentityService
  ) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.identityService.getAccesToken()}`,
    });
  }

  public getMessages(page: number, username: string) {
    const headers = this.headers;
    return this.httpClient.get(
      `${this.messagesUrl}${page}/${this.identityService.user$.value.userName}/${username}`, {headers}
    );
  }

  public addMessage(message) {
    const headers = this.headers;
    return this.httpClient.post(this.messagesUrl, message, {headers}).pipe(
      map((result) => result),
      catchError((error) => {
        console.log('błąd przy wysyłaniu wiadomości');
        return error;
      })
    );
  }

  public getInbox(page: number) {
    const headers = this.headers;
    return this.httpClient.get(
      `${this.messagesUrl}${page}/${this.identityService.currentUser$.value}`, {headers}
    );
  }
}
