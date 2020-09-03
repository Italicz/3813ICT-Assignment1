import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';

const backUrl = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string = "";
  username:string = "";
  password:string = "";
  newuser:User;
  userid="";

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  
  registeredAccount() {
    let user = {username: this.username, password: this.password};
    this.httpClient.post(backUrl + '/api/auth', user, httpOptions).subscribe((data:any) => {
        if (data.valid){
          this.newuser = new User(data.username, data.age, data.email)
          sessionStorage.setItem('currentUser', JSON.stringify(this.newuser));
          this.router.navigateByUrl("/account");
        } else {
          alert ("Sorry, account credentials are not valid");
        }
    })
  }

}
