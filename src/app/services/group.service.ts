import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) { }

  createGroup(groupName) {
    return this.httpClient.post("http://localhost:3000/api/creategroup", {groupName: groupName});
  }

  deleteGroup(removeGroup) {
    return this.httpClient.post("http://localhost:3000/api/deletegroup", {groupName: removeGroup});
  }

  addUserToGroup(name:string, username:string) {
    return this.httpClient.post("http://localhost:3000/api/addusertogroup", {groupName: name, username: username});
  }

  deleteUserFromGroup(name:string, username:string) {
    return this.httpClient.post("http://localhost:3000/api/deleteusergroup", {groupName: name, username: username});
  }

  getUsersGroups(username:string) {
    return this.httpClient.post("http://localhost:3000/api/getusersgroups", {username: username});
  }
}
