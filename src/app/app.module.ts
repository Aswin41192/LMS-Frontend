import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing-module';
import { UserManagementComponent } from './user-management/user-management.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RoosterComponent } from './rooster/rooster.component';
import { CourseDocumentComponent } from './course-document/course-document.component';
import { CourseAttendeeComponent } from './course-attendee/course-attendee.component';
import { CourseComponent } from './course/course.component';
import { AttendeeViewComponent } from './attendee-view/attendee-view.component';
import { EnrolledCourseViewComponent } from './enrolled-course-view/enrolled-course-view.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    RoosterComponent,
    CourseDocumentComponent,
    CourseAttendeeComponent,
    CourseComponent,
    AttendeeViewComponent,
    EnrolledCourseViewComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
