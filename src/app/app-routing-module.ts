import {Router, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { UserManagementComponent } from './user-management/user-management.component';
import { RoosterComponent } from './rooster/rooster.component';
import { CourseDocumentComponent } from './course-document/course-document.component';

const routes: Routes = [{
  path: 'rooster',
  component: RoosterComponent
}, {
  path: 'users',
  component: UserManagementComponent
}, {
  path: 'course/documents',
  component: CourseDocumentComponent
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
