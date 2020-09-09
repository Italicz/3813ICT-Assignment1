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

  addUserToGroup(groupName:string, username:string) {
    return this.httpClient.post("http://localhost:3000/api/addusertogroup", {group: groupName, username: username});
  }

  deleteUserFromGroup(groupName:string, username:string) {
    return this.httpClient.post("http://localhost:3000/api/deleteusergroup", {group: groupName, username: username});
  }

  getUsersGroups(username:string) {
    return this.httpClient.post("http://localhost:3000/api/getusersgroups", {username: username});
  }
}
