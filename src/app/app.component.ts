import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from './services/login.service';
import { User } from './model/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'LMS';
  user: User;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginService.userSubject.subscribe(user => {
      this.user = user;
      console.log('User Observable', user);
    });
  }

  logout() {
    const reply = confirm('Are you sure to logout?');
    if (reply) {
      this.router.navigate(['']);
      this.loginService.userSubject.next(new User());

    }
  }

}
