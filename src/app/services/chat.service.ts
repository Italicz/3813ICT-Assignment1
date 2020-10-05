import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  //Add a new chat message with a channel name, message and username
  addChat(channelName:string, message:string, username:string) {
    return this.http.post('http://localhost:3000/api/addchat', {channelName: channelName, message: message, username: username});
  }

  //Get all chat messages for a channel by the channel name
  getChats(name:string) {
    return this.http.post('http://localhost:3000/api/getchats', {channelName: name});
  }
}
