import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  initSocket(): void {
    this.socket = io("http://localhost:3000/chat");
  }

  public newNotice(): Observable<any> {
    let observable = new Observable(observer => {
      this.socket.on('notice', (data:string) => observer.next(data));
    })
    return observable;
  }

  public onMessage(): Observable<any> {
    let observable = new Observable(observer => {
      this.socket.on('message', (data:string) => observer.next(data));
    })
    return observable;
  }

  public join(room, username) {
    this.socket.emit('joinRoom', {room, username})
  }

  public leave(room, username) {
    this.socket.emit('leaveRoom', {room, username})
  }

  public send(message: string) {
    this.socket.emit('message', message)
  }

  constructor() { }
}
