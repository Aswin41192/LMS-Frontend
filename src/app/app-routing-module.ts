import {Router, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { UserManagementComponent } from './user-management/user-management.component';
import { RoosterComponent } from './rooster/rooster.component';
import { CourseDocumentComponent } from './course-document/course-document.component';
import { CourseAttendeeComponent } from './course-attendee/course-attendee.component';
import { CourseComponent } from './course/course.component';
import { AttendeeViewComponent } from './attendee-view/attendee-view.component';
import { EnrolledCourseViewComponent } from './enrolled-course-view/enrolled-course-view.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
  path: 'rooster',
  component: RoosterComponent
}, {
  path: 'users',
  component: UserManagementComponent
}, {
  path: 'course/documents',
  component: CourseDocumentComponent
}, {
  path: 'courses/attendees/:courseId',
  component: CourseAttendeeComponent
}, {
  path: 'addCourse',
  component: CourseComponent
}, {
  path: 'userView',
  component: AttendeeViewComponent
}, {
  path: 'enrolledCourses',
  component: EnrolledCourseViewComponent
}, {
  path: 'login',
  component: LoginComponent
},
{
  path: '',
  redirectTo: 'rooster',
  pathMatch: 'full'
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
