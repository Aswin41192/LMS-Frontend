import { Component, OnInit } from '@angular/core';
import { DataTranserService } from '../services/data.transfer.service';
import { CourseDocument } from '../model/CourseDocument';
import { Course } from '../model/Course';
import { CourseService } from '../services/course.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-course-document',
  templateUrl: './course-document.component.html',
  styleUrls: ['./course-document.component.css']
})
export class CourseDocumentComponent implements OnInit {
  course: Course;
  courseDocuments: CourseDocument[] = [];
  file: File = null;
  constructor(private dataTransferService: DataTranserService, private courseService: CourseService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.course = this.dataTransferService.getData();
  }

  downloadCourseDocument(documentId, fileName) {
    console.log('Course document', documentId + ' ' + this.course['_id']);
    this.courseService.downloadCourse(this.course['_id'], documentId, fileName);
  }

  deleteCourseDocument(documentId) {
    const reply = confirm('Are you sure to delete the document');
    if (reply) {
      this.spinner.show();
      const payload = {
        "_id" : this.course._id,
        "documentId" : documentId
      };
      this.courseService.deleteCourse(payload).subscribe(res => {
        console.log('response', res);
        if (res && res.success) {
          alert(res.response.message);
          console.log('Courses', this.course);
          const index = this.course.courseDocuments.
                        findIndex(courseDocument => courseDocument._id === documentId);
          this.course.courseDocuments.splice(index, 1);
        } else {
          alert(res.response.message);
        }
        this.spinner.hide();
      });
    }
  }

  getUploadedFile(files: FileList) {
    console.log('Uploaded File ', files.item(0));
    this.file = files.item(0);
  }

  uploadDocument() {
    this.spinner.show();
    const formData: FormData = new  FormData();
    formData.append('courseDocument', this.file);
    formData.append('_id', this.course._id);
    console.log('Form Data', formData);
    this.courseService.uploadCourseDocument(formData).subscribe(res => {
      if (res && res.success) {
        console.log('res', res);
        const course = res.response;
        this.course.courseDocuments = course.courseDocuments;
        console.log('added', this.course.courseDocuments);
      } else {
          alert('Error while uploading document');
      }
      this.spinner.hide();
    });
  }


}
