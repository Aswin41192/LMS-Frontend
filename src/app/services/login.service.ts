import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { environment } from '../../environments/environment';
import { Response } from '../model/Response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  loggedInUser: User;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.loggedInUser = new User();
  }

  getLoggedInUser(): User {
    return this.loggedInUser;
  }

  authenticate(email: string, password: string): Observable<Response> {
    const body = {email, password};
    return this.http.post<Response>(`${this.apiUrl}/users/validate`, body, this.httpOptions);
  }

}
