import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { WebsocketsService } from './services/websockets.service';
import { ToastModule } from 'primeng/toast';
import { environment } from './environments/environment';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ConfirmationService, MessageService]
})
export class AppComponent {
  title = 'HeartConnect';
  isLogged = false;

  private socket: any; 

  constructor(
    private primengConfig: PrimeNGConfig, 
    private messageService: MessageService, 
    private websocket: WebsocketsService
  ){}

  ngOnInit() {
    this.socket = io(environment.websocket)
  }
}
