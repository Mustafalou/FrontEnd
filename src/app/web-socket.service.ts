import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket;
  constructor() { 
    this.socket = new WebSocket("ws://localhost:7071");
  }
  // this method is used to get response from server
  send(message: string): void{
    this.socket.send(message);
  }
  disconnect(): void{
    this.socket.close();
  }
}
