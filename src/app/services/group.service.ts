import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) { }

  //Create a group with a group name
  createGroup(groupName) {
    return this.httpClient.post("http://localhost:3000/api/creategroup", {groupName: groupName});
  }

  //Delete a group by its ID
  deleteGroup(id) {
    return this.httpClient.post("http://localhost:3000/api/deletegroup", {id: id});
  }

  //Add user to a group with the group name and username
  addUserToGroup(user:User, groupName:string, username:string) {
    return this.httpClient.post("http://localhost:3000/api/addusertogroup", {user: user, group: groupName, username: username});
  }

  //Delete user from a group using group name and username
  deleteUserFromGroup(user:User, groupName:string, username:string) {
    return this.httpClient.post("http://localhost:3000/api/deleteusergroup", {user: user, group: groupName, username: username});
  }

  //Get all groups belonging to a user
  getUsersGroups(username:string) {
    return this.httpClient.post("http://localhost:3000/api/getusersgroups", {username: username});
  }

  //Get all groups that exist
  getGroups() {
    return this.httpClient.get("http://localhost:3000/api/getgroups");
  }
}
