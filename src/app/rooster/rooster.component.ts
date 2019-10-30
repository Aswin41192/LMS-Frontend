import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../model/Course';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rooster',
  templateUrl: './rooster.component.html',
  styleUrls: ['./rooster.component.css']
})
export class RoosterComponent implements OnInit {

  courses: Course[] = [];
  course: Course = new Course();

  constructor(private courseService: CourseService, private spinner: NgxSpinnerService) { }

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


}
