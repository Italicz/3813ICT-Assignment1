import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { GroupService } from '../services/group.service';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user:User;

  constructor(private userService:UserService, private groupService:GroupService, private channelService:ChannelService) { }

  username:string;
  email:string;
  password:string;
  role:string;
  removeUser:string;
  groupName:string = '';
  removeGroup:string;
  channelName:string = '';
  removeChannel:string;

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
    this.groupService.createGroup(this.groupName).subscribe((data: any) => {
      if(data == false) {
        alert("Error, this group already exists");
      } else {
        alert("Group Created");
      }
    })
  }

  deleteGroup() {
    this.groupService.deleteGroup(this.removeGroup).subscribe((data: any) => {
      if(data == false) {
        alert("Error, this group doesn't exists");
      } else {
        alert("Group Deleted");
      }
    })
  }

  createChannel() {
    this.channelService.createChannel(this.groupName, this.channelName).subscribe((data: any) => {
      if (!data.ok) {
        alert("Error, a channel with this name already exists!");
      } else {
        alert("Successfully created channel: " + data.name)
      }
    });
    
  }

  deleteChannel() {
    this.channelService.deleteChannel(this.groupName, this.removeChannel).subscribe((data: any) => {
      if (!data.ok) {
        alert("Error, a channel with this name doesn't exist!");
      } else {
        alert("Successfully deleted channel: " + data.name)
      }
    })
  }

}
