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

  constructor(private userService:UserService, private groupService:GroupService, private channelService:ChannelService) { }

  users = [];
  groups = [];
  channels = [];
  user:User;
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
    //On init get current user from localstorage, all users, groups and channels
    this.user = JSON.parse(localStorage.getItem('currentUser'))
    this.getUsers();
    this.getGroups();
    this.getChannels();
  }

  //Create new user
  createAccount() {
    this.userService.createUser(this.username, this.email, this.password, this.role).subscribe((data: any) => {
      if (!data.ok) {
        alert("Error, user already exists");
      } else {
        alert("User created: " + data.username);
      }
    })
  }

  //Delete user with id
  deleteUser(id) {
    this.userService.deleteUser(id).subscribe((data: any) => {
      this.users = data;
    })
  }

  //Create new group
  createGroup() {
    this.groupService.createGroup(this.groupName).subscribe((data: any) => {
      if(data == false) {
        alert("Error, this group already exists");
      } else {
        alert("Group Created: " + data.groupName);
      }
    })
  }

  //Delete group with id
  deleteGroup(id) {
    this.groupService.deleteGroup(id).subscribe((data: any) => {
      this.groups = data;
    })
  }

  //Create new channel for a group
  createChannel() {
    this.channelService.createChannel(this.groupName, this.channelName).subscribe((data: any) => {
      if (!data.ok) {
        alert("Error, a channel with this name already exists!");
      } else {
        alert("Channel Created: " + data.name + " in Group: " + data.group)
      }
    });
    
  }

  //Delete channel with id
  deleteChannel(id) {
    this.channelService.deleteChannel(this.user, id).subscribe((data: any) => {
      this.channels = data;
    })
  }

  //Add a user to an existing group
  addUserToGroup() {
    this.groupService.addUserToGroup(this.user, this.groupName, this.username).subscribe((data: any) => {
      if (!data.ok) {
        alert("Error, this user or group doesn't exist");
      } else {
        alert("User added to " + data.group);
      }
    })
  }

  //Delete user from an existing group
  deleteUserFromGroup() {
    this.groupService.deleteUserFromGroup(this.user, this.groupName, this.username).subscribe((data: any) => {
      if (!data.ok) {
        alert("Error, this user or group doesn't exist");
      } else {
        alert("User removed from " + data.group);
      }
    })
  }

  //Add user to channel
  addUserToChannel() {
    this.channelService.addUserToChannel(this.user, this.groupName, this.channelName, this.username).subscribe((data: any) => {
      if (!data.ok) {
        alert("Error, this user or channel or group doesn't exist");
      } else {
        alert("User added to channel " + data.name);
      }
    })
  }

  //Delete user from channel
  deleteUserFromChannel() {
    this.channelService.deleteUserFromChannel(this.user, this.groupName, this.channelName, this.username).subscribe((data: any) => {
      if (!data.ok) {
        alert("Error, this user or channel or group doesn't exist");
      } else {
        alert("User removed from channel " + data.name);
      }
    })
  }

  //Get all users
  getUsers() {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
    })
  }

  //Get all groups
  getGroups() {
    this.groupService.getGroups().subscribe((data: any) => {
      this.groups = data;
    })
  }

  //Get all channels
  getChannels() {
    this.channelService.getChannels().subscribe((data: any) => {
      this.channels = data;
    })
  }

}
