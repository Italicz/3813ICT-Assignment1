import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private httpClient: HttpClient) { }

  //Create new channel with a group name and channel name
  createChannel(groupName:string, channelName:string) {
    return this.httpClient.post("http://localhost:3000/api/createchannel", {group: groupName, name: channelName});
  }

  //Delete channel and its users
  deleteChannel(user:User, id) {
    return this.httpClient.post("http://localhost:3000/api/deletechannel", {user: user, id: id});
  }

  //Add user to channel with the username and group name and channel name
  addUserToChannel(user:User, groupName:string, channelName:string, username:string) {
    return this.httpClient.post("http://localhost:3000/api/addusertochannel", {user: user, group: groupName, name: channelName, username: username});
  }

  //Delete user from a channel using the username group name and channel name
  deleteUserFromChannel(user:User, groupName:string, channelName:string, username:string) {
    return this.httpClient.post("http://localhost:3000/api/deleteuserchannel", {user: user, group: groupName, name: channelName, username: username});
  }

  //Get all channels
  getChannels() {
    return this.httpClient.get("http://localhost:3000/api/getchannels");
  }

}
