import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private loginService: LoginService,private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  authenticate() {
    this.spinner.show();
    this.loginService.authenticate(this.email, this.password).subscribe(res => {
      console.log('Response', res);
      this.spinner.hide();
      if (res && res.success) {
        this.loginService.loggedInUser = res.response;
        console.log('Logged in User', this.loginService.loggedInUser);
        this.router.navigate(['']);
      } else {
        alert(res.message);
      }
    });
  }


}
