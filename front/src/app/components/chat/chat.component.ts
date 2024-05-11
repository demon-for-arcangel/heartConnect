import { Component, } from '@angular/core';
import { RouterModule } from '@angular/router';
import io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  private socket = io('http://localhost:8090');

  constructor() {}

  sendMessage() {
    this.socket.emit('message', { data: 'Hello from client!' });
  }
}
