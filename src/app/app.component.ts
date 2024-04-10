import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FrontEnd';
  constructor(private ws:WebSocketService){}
}
