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
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';

const routes: Routes = [{
  path: 'rooster',
  component: RoosterComponent,
  canActivate: [AuthGuard]
}, {
  path: 'users',
  component: UserManagementComponent,
  canActivate: [AuthGuard]
}, {
  path: 'course/documents',
  component: CourseDocumentComponent,
  canActivate: [AuthGuard]
}, {
  path: 'courses/attendees/:courseId',
  component: CourseAttendeeComponent,
  canActivate: [AuthGuard]
}, {
  path: 'addCourse',
  component: CourseComponent,
  canActivate: [AuthGuard]
}, {
  path: 'userView',
  component: AttendeeViewComponent,
  canActivate: [AuthGuard]
}, {
  path: 'enrolledCourses',
  component: EnrolledCourseViewComponent,
  canActivate: [AuthGuard]
}, {
  path: 'login',
  component: LoginComponent,
  canActivate: [LoginGuard]
},
{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
