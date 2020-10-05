import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { ChannelService } from '../services/channel.service';
import { ChatService } from '../services/chat.service';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private groupService: GroupService, private router: Router, private channelService: ChannelService, private chatService: ChatService, private socketService: SocketService) { }

  user:User;
  groups:[] = [];
  channels:[] = [];
  messages = [];
  newMessage: string;
  channelName: string;
  ioConnection: any;
  msg: any;
  currentChannel: any;
  inRoom: boolean;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.inRoom = false;
    this.getGroups();
    this.getChannels();
    this.socketService.initSocket();
    this.ioConnection = this.socketService.newNotice().subscribe((msg:string) => {
      this.messages.push({user: 'Server', message: msg});
    });
    this.ioConnection = this.socketService.onMessage().subscribe((msg:string) => {
      this.messages.push(msg);
    });

    if (!this.user) {
      this.router.navigateByUrl('/')
    }

  }


  join() {
    this.socketService.join(this.currentChannel, this.user.username);
    this.inRoom = true;
  }

  leave() {
    this.socketService.leave(this.currentChannel, this.user.username);
    this.inRoom = false;
    this.currentChannel = "";
    this.messages = [];
  }


  getGroups() {
    this.groupService.getGroups().subscribe((data: any) => {
      this.groups = data;
    })
  }

  getChannels() {
    this.channelService.getChannels().subscribe((data: any) => {
      this.channels = data;
    })
  }

}
