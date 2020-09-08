import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  createUser(username:string, email:string, password:string, role:string){
      return this.httpClient.post("http://localhost:3000/api/createuser", {username: username, email: email, password: password, role: role});
  }

  deleteUser(removeUser) {
    return this.httpClient.post("http://localhost:3000/api/deleteuser", {username: removeUser});
  }

}
