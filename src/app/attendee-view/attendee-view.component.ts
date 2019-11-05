import { Component, OnInit } from '@angular/core';
import { Course } from '../model/Course';
import { CourseService } from '../services/course.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-attendee-view',
  templateUrl: './attendee-view.component.html',
  styleUrls: ['./attendee-view.component.css']
})
export class AttendeeViewComponent implements OnInit {

  courses: Course[] = [];
  constructor(private courseService: CourseService, private spinner: NgxSpinnerService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.spinner.show();
    this.courses = [];
    this.getAllCoursesForAttendee();
  }


  private getAllCoursesForAttendee() {
    this.courseService.getAllCoursesForAttendee('5db6e551237d4e2fd0ede8d2').subscribe(res => {
      if (res && res.success) {
        this.courses = res.response;
      } else {
        alert('Error while fetching courses for the attendee!');
      }
      this.spinner.hide();
    });
  }

  enrollAttendee(id: string) {
    this.spinner.show();
    const body = {
      _id: id,
      attendee: this.loginService.getLoggedInUser()
    };

    console.log('enrollAttendee',body);
    this.courseService.enrollAttendeeToCourse(body).subscribe(res => {
        if (res && res.success) {
            alert('Enrolled Successfully');
            this.getAllCoursesForAttendee();
        } else {
          console.log('enrollAttendeeToCourse', res);
          alert(res.response);
        }
    });
  }

}

