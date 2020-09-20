import { Injectable } from '@angular/core';
import { IdentityService } from './identity.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, catchError, retryWhen } from 'rxjs/operators';
// import { UserBuilder } from '../model/builder/user.builder';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  private url = 'https://Localhost:5001/api/users/';

  constructor(
    private identityService: IdentityService,
    private httpClient: HttpClient,
    private router: Router) {
  }
public getUserByName(username: string){
    return this.httpClient.get(`${this.url}${username}`);
 }
 
public editCurrentUser(data) {
    const headers = new HttpHeaders({
        Authorization: `Bearer ${this.identityService.getAccesToken()}`
    });
    return this.httpClient.post(`${this.url}${this.identityService.user$.value.applicationId}`, data, {headers});
}

public getUserIdentityData(username: string) {
    const headers = new HttpHeaders({
        Authorization: `Bearer ${this.identityService.getAccesToken()}`
    });
    return this.httpClient.get(`${this.url}identity/${username}`);
}

}

