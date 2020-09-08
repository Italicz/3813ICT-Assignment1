import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user:User;

  constructor(private userService:UserService) { }

  username:string;
  email:string;
  password:string;
  role:string;
  removeUser:string;
  groupName:string = '';
  removeGroup:string;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'))
  }

  createAccount() {
    this.userService.createUser(this.username, this.email, this.password, this.role).subscribe((data: any) => {
      if (data == false) {
        alert("Error, user already exists");
      } else {
        alert("User created");
      }
    })
  }

  deleteUser() {
    this.userService.deleteUser(this.removeUser).subscribe((data: any) => {
      if(data == false) {
        alert("Error, this user doesn't exist");
      } else {
        alert("User deleted")
      }
    })
  }

  createGroup() {
    this.userService.createGroup(this.groupName).subscribe((data: any) => {
      if(data == false) {
        alert("Error, this group already exists");
      } else {
        alert("Group Created");
      }
    })
  }

  deleteGroup() {
    this.userService.deleteGroup(this.removeGroup).subscribe((data: any) => {
      if(data == false) {
        alert("Error, this group doesn't exists");
      } else {
        alert("Group Deleted");
      }
    })
  }
}
