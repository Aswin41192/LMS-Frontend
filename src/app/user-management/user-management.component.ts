import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../model/User';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public users: User[];
  public user: User = new User('', '', '');

  constructor(private userService: UserService, private spinner: NgxSpinnerService) {
   }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.users = [];
    this.spinner.show();
    this.userService.getAllUsers().subscribe(res => {
      if (res) {
          if (res.success) {
              this.users = res.response;
          } else {
            alert(res.message);
          }
      } else {
        alert('Internal error occured!');
      }
      this.spinner.hide();
    } );
  }

  deleteUser(id: string) {
    const reply = confirm('Are you sure to delete this user');
    if (reply) {
      this.spinner.show();
      this.userService.deleteUser(id).subscribe(res => {
        if (res) {
            if (res.success) {
              alert('User Deleted Successfully');
              this.getAllUsers();
            } else {
              alert(res.message);
            }
        } else {
          alert('Internal error occured!');
        }
      });
    }
  }

  createUser() {
    console.log(this.user);
    this.spinner.show();
    this.userService.createUser(this.user).subscribe(res => {
      if (res) {
          if (res.success) {
            alert('User Added Successfully');
            this.user = new User('', '', '');
            this.getAllUsers();
          } else {
            alert(res.message);
          }
      } else {
        alert('Internal error occured!');
      }
    });
  }

  populateSelectedUser(user) {
    this.user = new User(user.firstName,user.lastName,user.email,user._id);
    console.log(this.user);
  }

  saveUser() {
    if (this.user) {
      console.log(this.user._id);
      if (this.user._id) {
        console.log('Updating User');
        this.updateUser();
      } else {
        console.log('Creating User');
        this.createUser();
      }
    } else {
      alert('Cannot populate selected user details');
    }
  }
  updateUser() {
    this.spinner.show();
    this.userService.updateUser(this.user).subscribe(res => {
      if (res) {
          if (res.success) {
            alert('User Updated Successfully');
            this.user = new User('', '', '');
            this.getAllUsers();
          } else {
            alert(res.message);
          }
      } else {
        alert('Internal error occured!');
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
