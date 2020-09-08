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

}
