import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { environment } from '../../environments/environment';
import { Response } from '../model/Response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getAllUsers(): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/users/get`);
  }

  deleteUser(id: string): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}/users/delete/${id}`) ;
  }

  createUser(user: User): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/users/save`, user, this.httpOptions);
  }

  updateUser(user: User): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/users/update`, user, this.httpOptions);
  }
}
