import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  user: User;
  constructor(private loginService: LoginService) {
    this.loginService.userSubject.subscribe(user => {
        this.user = user;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
     return !this.user._id;
    }
}
