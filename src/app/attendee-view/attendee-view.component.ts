import { Component, OnInit, ChangeDetectorRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Course } from '../model/Course';
import { CourseService } from '../services/course.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../services/login.service';
import { User } from '../model/User';

@Component({
  selector: 'app-attendee-view',
  templateUrl: './attendee-view.component.html',
  styleUrls: ['./attendee-view.component.css']
})
export class AttendeeViewComponent implements OnInit {
  user: User;
  courses: Course[] = [];
  constructor(private courseService: CourseService, private spinner: NgxSpinnerService,
              private loginService: LoginService, private changeDetectorRef: ChangeDetectorRef) {
    this.user = new User();
  }

  ngOnInit() {
    this.spinner.show();
    this.courses = [];
    this.loginService.userSubject.subscribe(user => {
      this.user = user;
      console.log('Getting course for attendee', this.user);
      this.getAllCoursesForAttendee(this.user._id);
    });
  }


  private getAllCoursesForAttendee(id: string) {
    this.courseService.getAllCoursesForAttendee(id).subscribe(res => {
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
      attendee: this.user
    };

    console.log('enrollAttendee', body);
    this.courseService.enrollAttendeeToCourse(body).subscribe(res => {
      if (res && res.success) {
        alert('Enrolled Successfully');
        this.getAllCoursesForAttendee(this.user._id);
      } else {
        console.log('enrollAttendeeToCourse', res);
        alert(res.response);
      }
    });
  }

}

