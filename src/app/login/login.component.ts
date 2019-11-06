import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usr: User = new User();
  isSignUp = false;

  constructor(private loginService: LoginService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  authenticate() {
    this.spinner.show();
    this.loginService.authenticate(this.usr.email, this.usr.password).subscribe(res => {
      console.log('Response', res);
      if (res && res.success) {
        const user: User = res.response;
        this.loginService.loggedInUser = user;
        this.loginService.userSubject.next(user);
        console.log('Logged in User', user);
        localStorage.setItem('token',user.token);
        if (user.admin) {
          this.router.navigate(['rooster']);
        } else {
          this.router.navigate(['userView']);
        }
      } else {
        alert(res.message);
      }
    });
  }

  registerUser() {
    this.spinner.show();
    console.log('User to register', this.usr);
    this.loginService.registerUser(this.usr).subscribe(res => {
        if (res && res.success) {
            this.usr = res.response;
            this.loginService.userSubject.next(this.usr);
            this.router.navigateByUrl('');
            this.spinner.hide();
        } else {
          alert(res.message);
          this.spinner.hide();
        }
    });
  }

}
