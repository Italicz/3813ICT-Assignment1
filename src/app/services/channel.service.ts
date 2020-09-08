import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private httpClient: HttpClient) { }

  createChannel(groupName:string, channelName:string) {
    return this.httpClient.post("http://localhost:3000/api/createchannel", {group: groupName, name: channelName});
  }

  deleteChannel(groupName:string, removeChannel:string) {
    return this.httpClient.post("http://localhost:3000/api/deletechannel", {group: groupName, name: removeChannel});
  }

}
