import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../services/login.service';
import { Course } from '../model/Course';
import { DataTransferService } from '../services/data.transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrolled-course-view',
  templateUrl: './enrolled-course-view.component.html',
  styleUrls: ['./enrolled-course-view.component.css']
})
export class EnrolledCourseViewComponent implements OnInit {

  courses: Course[] = [];
  constructor(private courseService: CourseService, private spinner: NgxSpinnerService,
              private loginService: LoginService, private dataTransferService: DataTransferService,
              private router: Router) { }

  ngOnInit() {
    this.courses = [];
    const id = this.loginService.getLoggedInUser()._id;
    this.getEnrolledCourse(id);
  }

  getEnrolledCourse(id: string) {
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
    const reply = confirm('Are you sure to withdraw from this course?');
    if (reply) {
      this.spinner.show();
      const user = this.loginService.getLoggedInUser();
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
