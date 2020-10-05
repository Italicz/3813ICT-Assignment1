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

  //Initialise with current user, get all groups and all channels for this user and intialise the socket
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


  //Join channel
  join() {
    this.socketService.join(this.currentChannel, this.user.username);
    this.inRoom = true;
  }

  //Leave channel
  leave() {
    this.socketService.leave(this.currentChannel, this.user.username);
    this.inRoom = false;
    this.currentChannel = "";
    this.messages = [];
  }

  //Get users groups
  getGroups() {
    this.groupService.getGroups().subscribe((data: any) => {
      this.groups = data;
    })
  }

  //Get users channels
  getChannels() {
    this.channelService.getChannels().subscribe((data: any) => {
      this.channels = data;
    })
  }

  //Add a new message in a channel
  addChat() {
    this.channelName = sessionStorage.getItem('channelName');
    if(!this.newMessage) {
      alert("Error, you can't submit an empty chat");
    }
    this.msg = {
      user: this.user.username,
      message: this.newMessage
    }
    this.socketService.send(this.msg);
    this.chatService.addChat(this.channelName, this.newMessage, this.user.username).subscribe((data: any) => {
      this.newMessage = "";
    });
  }

  //Get all messages for a channel
  getChats(name) {
    sessionStorage.setItem("channelName", name);
    this.currentChannel = name;
    this.join();
    this.chatService.getChats(name).subscribe((data: any) => {
      this.messages = data;
    })
  }

}
