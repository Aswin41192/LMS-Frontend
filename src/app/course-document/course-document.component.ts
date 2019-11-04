import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataTransferService } from '../services/data.transfer.service';
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
  files: File[] = [];

  @ViewChild('uploadedFile', { static: false })
  private host: ElementRef;
  constructor(private courseService: CourseService,
              private spinner: NgxSpinnerService, private dataTransferService: DataTransferService) { }

  ngOnInit() {
    this.course = this.dataTransferService.getData();
    console.log('course', this.course);
  }

  downloadCourseDocument(documentId, fileName) {
    console.log('Course document', documentId + ' ' + this.course._id);
    this.courseService.downloadCourse(this.course._id, documentId, fileName);
  }

  deleteCourseDocument(documentId) {
    const reply = confirm('Are you sure to delete the document');
    if (reply) {
      this.spinner.show();
      const payload = {
        '_id': this.course._id,
        'documentId': documentId
      };
      this.courseService.deleteCourseDocument(payload).subscribe(res => {
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
    console.log('Uploaded File ', files);
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }
  uploadDocument(uploadedFile) {
    if (this.files.length === 0) {
      alert('Select a file');
      return;
    }
    uploadedFile.reset();
    this.spinner.show();
    const formData: FormData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      formData.append('courseDocument', this.files[i]);
    }
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
      console.log('host', this.host.nativeElement.value);
      this.host.nativeElement.value = '';
      this.files = [];
      this.spinner.hide();
    });
  }


}
