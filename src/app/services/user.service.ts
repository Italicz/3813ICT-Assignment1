import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  //Create user with username email password and role
  createUser(username:string, email:string, password:string, role:string){
      return this.httpClient.post("http://localhost:3000/api/createuser", {username: username, email: email, password: password, role: role});
  }

  //Delete user by ID
  deleteUser(id) {
    return this.httpClient.post("http://localhost:3000/api/deleteuser", {id: id});
  }

  //Get all existing users
  getUsers() {
    return this.httpClient.get("http://localhost:3000/api/getusers");
  }
}
