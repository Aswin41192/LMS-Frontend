import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../model/Response';
import { saveAs } from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';
import { Course } from '../model/Course';


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

  getAllCoursesForAttendee(id): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/courses/getCoursesForAttendee/${id}`);
  }

  getEnrolledCoursesForAttendee(id): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/courses/getEnrolledCourses/${id}`);
  }

  enrollAttendeeToCourse(course): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/courses/saveAttendee`, course, this.headerOptions);
  }

  deregisterAttendee(course) {
    console.log('deregisterAttendee', course);
    return this.http.post<Response>(`${this.apiUrl}/courses/removeAttendee`, course, this.headerOptions);
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

  deleteCourseDocument(course): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/courses/deleteDocument`, course, this.headerOptions);
  }

  deleteCourse(id: string): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}/courses/delete/${id}`);
  }

  createCourse(course: Course): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/courses/save`, course, this.headerOptions);
  }

  updateCourse(course: Course): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/courses/update`, course, this.headerOptions);
  }

  uploadCourseDocument(document): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/courses/saveDocument`, document);
  }

  getCourseAttendes(courseId): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/courses/getAttendees?courseId=${courseId}`);
  }
}
