import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
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
  userSubject: Subject<User> = new BehaviorSubject(new User());
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.loggedInUser = new User();
  }

  authenticate(email: string, password: string): Observable<Response> {
    const body = {email, password};
    return this.http.post<Response>(`${this.apiUrl}/users/validate`, body, this.httpOptions);
  }

  registerUser(user: User) {
    return this.http.post<Response>(`${this.apiUrl}/users/save`, user, this.httpOptions);
  }

  getLoggedInUser() {
    return this.userSubject.asObservable();
  }

}
