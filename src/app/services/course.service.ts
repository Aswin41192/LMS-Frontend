import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../model/Response';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {

  }

  getAllCourses(): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/courses/get`);
  }
}
