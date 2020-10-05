import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  addChat(channelName:string, message:string, username:string) {
    return this.http.post('http://localhost:3000/api/addchat', {channelName: channelName, message: message, username: username});
  }

  getChats(name:string) {
    return this.http.post('http://localhost:3000/api/getchats', {channelName: name});
  }
}
