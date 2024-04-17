import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService, PrimeNGConfig, MessageService } from 'primeng/api';
import { WebsocketsService } from './services/websockets.service';
import { ToastModule } from 'primeng/toast';
import { environment } from './environments/environment';
import { io } from 'socket.io-client';
import { FooterComponent } from './components/shared/footer/footer.component';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, FooterComponent, EditorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ConfirmationService, MessageService]
})
export class AppComponent implements OnInit {
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
