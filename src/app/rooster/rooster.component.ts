import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../model/Course';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { DataTransferService } from '../services/data.transfer.service';

@Component({
  selector: 'app-rooster',
  templateUrl: './rooster.component.html',
  styleUrls: ['./rooster.component.css']
})
export class RoosterComponent implements OnInit {

  courses: Course[] = [];
  course: Course = new Course();

  constructor(private courseService: CourseService, private spinner: NgxSpinnerService,
              private router: Router, private dataTransferService: DataTransferService) { }

  ngOnInit() {
    this.getAllCourses();
  }

  getAllCourses() {
    this.courses = [];
    this.spinner.show();
    this.courseService.getAllCourses().subscribe(res => {
      if (res) {
          if (res.success) {
              this.courses = res.response;
          } else {
            alert(res.message);
          }
      } else {
        alert('Internal error occured!');
      }
      this.spinner.hide();
    } );
  }

setSelectedCourse(course: Course) {
  console.log('Selected course', course);
  this.dataTransferService.setData(course);
  console.log('Course Set ', this.dataTransferService.getData());
  this.router.navigate(['/course/documents']);
}

updateCourse(course: Course) {
  this.dataTransferService.setData(course);
  this.router.navigateByUrl('addCourse');
}

deleteCourse(course) {
  const reply = confirm('Are you sure to delete the course');
  if (reply) {
  this.spinner.show();
  this.courseService.deleteCourse(course).subscribe( res => {
    if (res && res.success) {
      alert(res.response.message);
      this.getAllCourses();
    } else {
      alert(res.response.message);
      this.spinner.hide();
    }
  });
}
}

getCourseAttendees(course: Course) {
  this.dataTransferService.setData(course);
  this.router.navigate(['/courses/attendees', course._id]);
}
}
