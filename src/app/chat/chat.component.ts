import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { User } from '../user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private groupService: GroupService) { }

  user:User;
  groups:[] = [];
  channels:[] = [];

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getUsersGroups();
  }

  getUsersGroups() {
    this.groupService.getUsersGroups(this.user.username).subscribe((data: any) => {
      this.groups = data;
    })
  }

}
