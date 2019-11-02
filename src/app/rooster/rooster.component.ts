import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../model/Course';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { DataTranserService } from '../services/data.transfer.service';

@Component({
  selector: 'app-rooster',
  templateUrl: './rooster.component.html',
  styleUrls: ['./rooster.component.css']
})
export class RoosterComponent implements OnInit {

  courses: Course[] = [];
  course: Course = new Course();

  constructor(private courseService: CourseService, private spinner: NgxSpinnerService,
              private router: Router, private dataTransferService: DataTranserService) { }

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
  this.dataTransferService.setData(course);
  this.router.navigate(['/course/documents']);
}
}
