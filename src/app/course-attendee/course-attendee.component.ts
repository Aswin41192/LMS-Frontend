import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { User } from '../model/User';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from '../model/Course';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataTransferService } from '../services/data.transfer.service';

@Component({
  selector: 'app-course-attendee',
  templateUrl: './course-attendee.component.html',
  styleUrls: ['./course-attendee.component.css']
})
export class CourseAttendeeComponent implements OnInit {

  public courseAttendees: User[] = [];
  public course: Course;
  constructor(
              private courseService: CourseService, private route: ActivatedRoute,
              private dataTransferService: DataTransferService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.course = this.dataTransferService.getData();
    const courseId = this.route.snapshot.params.courseId;
    this.courseService.getCourseAttendes(courseId).subscribe(res => {
      if (res && res.success) {
        this.courseAttendees = [];
        this.courseAttendees = res.response;
        console.log('Course Attendees', this.courseAttendees);
      }
      this.spinner.hide();
    });
  }

}
