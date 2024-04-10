import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService {
  private socket!: WebSocket;
  private messageSubject: Subject<any> = new Subject<any>();
  constructor() { 

    this.socket = new WebSocket("ws://localhost:7071");
    this.socket.onopen = (event)=>{
      console.log('Websocket connection opened');
    }
    this.socket.onmessage = (event)=>{
      this.messageSubject.next(event.data);
    }
    this.socket.onerror = (error)=>{
      console.error("Websocket error: ", error);
    }
    this.socket.onclose = (event)=>{
      console.log("websocket connection closed");
    }
  }
  getMessage():Subject<any>{
    return this.messageSubject;
  }
  sendMessage(message: string): void {
    this.socket.send(message);
  }

  closeConnection(): void {
    this.socket.close();
  }
  public isWebSocketOpen(): boolean{
    return this.socket.readyState === WebSocket.OPEN;
  }
}
