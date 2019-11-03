import { CourseDocument } from './CourseDocument';
import { User } from './User';

export class Course {
   // tslint:disable-next-line: variable-name
   _id: string;
  courseTitle: string ;
  description: string ;
  schedule: any ;
  duration = 8;
  maxRegistrationLimit: number ;
  courseDocuments: CourseDocument[] = [];
  courseAttendees: User[] = [];
  constructor() {

  }
}
