import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../services/login.service';
import { Course } from '../model/Course';
import { DataTransferService } from '../services/data.transfer.service';
import { Router } from '@angular/router';
import { User } from '../model/User';

@Component({
  selector: 'app-enrolled-course-view',
  templateUrl: './enrolled-course-view.component.html',
  styleUrls: ['./enrolled-course-view.component.css']
})
export class EnrolledCourseViewComponent implements OnInit {

  courses: Course[] = [];
  user: User;
  constructor(private courseService: CourseService, private spinner: NgxSpinnerService,
              private loginService: LoginService, private dataTransferService: DataTransferService,
              private router: Router) {
                this.user = new User();
              }

  ngOnInit() {
    this.courses = [];

    this.loginService.userSubject.subscribe(user => {
       this.user = user;
       console.log('Getting enrolled courses', this.user);
       this.getEnrolledCourse(this.user._id);
    });

  }

  getEnrolledCourse(id: string) {
    console.log('Getting enrolled courses for '+ id);
    this.spinner.show();
    this.courseService.getEnrolledCoursesForAttendee(id).subscribe(res => {
      if (res && res.success) {
        this.courses = res.response;
      } else {
        alert('Failed to get enrolled courses');
      }
      this.spinner.hide();
    });
  }

  deregisterFromCourse(id: string) {
    console.log('Deregistering', this.user);
    const reply = confirm('Are you sure to withdraw from this course?');
    if (reply) {
      this.spinner.show();
      const user = this.user;
      const body = {
        _id: id,
        attendeeId: user._id
      };
      this.courseService.deregisterAttendee(body).subscribe(res => {
        if (res && res.success) {
          alert('Deregistered Successfully');
          this.getEnrolledCourse(user._id);
        } else {
          this.spinner.hide();
          alert('Failed to deregister from the course');
        }
      });
    }
  }
  populateCourse(course: Course) {
    console.log('Selected course', course);
    this.dataTransferService.setData(course);
    console.log('Course Set ', this.dataTransferService.getData());
    this.router.navigate(['/course/documents']);
  }
}
