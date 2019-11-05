import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { User } from './model/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LMS';
  user: User;
  constructor(private loginService: LoginService) {
  }
}
