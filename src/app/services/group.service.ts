import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) { }

  createGroup(groupName) {
    return this.httpClient.post("http://localhost:3000/api/creategroup", {groupName: groupName});
  }

  deleteGroup(id) {
    return this.httpClient.post("http://localhost:3000/api/deletegroup", {id: id});
  }

  addUserToGroup(user:User, groupName:string, username:string) {
    return this.httpClient.post("http://localhost:3000/api/addusertogroup", {user: user, group: groupName, username: username});
  }

  deleteUserFromGroup(user:User, groupName:string, username:string) {
    return this.httpClient.post("http://localhost:3000/api/deleteusergroup", {user: user, group: groupName, username: username});
  }

  getUsersGroups(username:string) {
    return this.httpClient.post("http://localhost:3000/api/getusersgroups", {username: username});
  }

  getGroups() {
    return this.httpClient.get("http://localhost:3000/api/getgroups");
  }
}
