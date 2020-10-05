import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  //Initialise socket at said url
  initSocket(): void {
    this.socket = io("http://localhost:3000/chat");
  }

  //New Notice
  public newNotice(): Observable<any> {
    let observable = new Observable(observer => {
      this.socket.on('notice', (data:string) => observer.next(data));
    })
    return observable;
  }

  //On message observable
  public onMessage(): Observable<any> {
    let observable = new Observable(observer => {
      this.socket.on('message', (data:string) => observer.next(data));
    })
    return observable;
  }

  //Join room with username
  public join(room, username) {
    this.socket.emit('joinRoom', {room, username})
  }

  //Leave room with username
  public leave(room, username) {
    this.socket.emit('leaveRoom', {room, username})
  }

  //Send message to room
  public send(message: string) {
    this.socket.emit('message', message)
  }

  constructor() { }
}
