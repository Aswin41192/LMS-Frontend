import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from '../model/Course';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataTransferService } from '../services/data.transfer.service';
import * as moment from 'moment';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  course: Course = new Course();
  constructor(private courseService: CourseService, private router: Router,
              private spinner: NgxSpinnerService, private dataTransferService: DataTransferService) { }

  ngOnInit() {
    this.course = this.dataTransferService.getData() ? this.dataTransferService.getData() : new Course();
    console.log(this.course.schedule);
    const formattedDate = moment(this.course.schedule, 'YYYY-MM-DD').format('YYYY-MM-DD');
    console.log( formattedDate);
    this.course.schedule = formattedDate;
  }

  createCourse() {
    if (this.course._id) {
        this.updateCourse();
    } else {
      this.insertCourse();

    }
  }

  private insertCourse() {
    this.spinner.show();
    this.course.schedule = moment(this.course.schedule, 'YYYY-MM-DD').format('DD-MM-YYYY');
    console.log('Saving Course', this.course);
    this.courseService.createCourse(this.course).subscribe(res => {
      this.spinner.hide();
      if (res && res.success) {
        alert('Course created successfully');
        this.router.navigateByUrl('');
      } else {
        alert('Error while creating course ');
      }
    });
  }

  private updateCourse() {
    this.spinner.show();
    this.course.schedule = moment(this.course.schedule, 'YYYY-MM-DD').format('DD-MM-YYYY');
    console.log('Saving Course', this.course);
    this.courseService.updateCourse(this.course).subscribe(res => {
      this.spinner.hide();
      if (res && res.success) {
        alert('Course updated successfully');
        this.router.navigateByUrl('');
      } else {
        alert('Error while creating course ');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

}
