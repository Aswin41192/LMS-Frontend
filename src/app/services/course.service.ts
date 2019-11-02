import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../model/Response';
import { saveAs } from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = environment.apiUrl;
  private headerOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {

  }

  getAllCourses(): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/courses/get`);
  }

  downloadCourse(courseId: string, documentId: string, fileName: string) {
    console.log(`${this.apiUrl}/courses/getDocs?documentId=${documentId}&courseId=${courseId}`);
    this.spinner.show();
    this.http.get(`${this.apiUrl}/courses/getDocs?documentId=${documentId}&courseId=${courseId}`
    ,
    { responseType: 'blob' })
    .toPromise()
    .then(blob => {
        saveAs(blob, fileName);
        this.spinner.hide();
    })
    .catch(err => {
      alert('download error');
      this.spinner.hide();
  });
  }

  deleteCourse(course): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/courses/deleteDocument`, course, this.headerOptions);
  }

  uploadCourseDocument(document): Observable<Response>{
    return this.http.post<Response>(`${this.apiUrl}/courses/saveDocument`, document);
  }
}
