import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService, PrimeNGConfig, MessageService, PrimeIcons } from 'primeng/api';
import { WebsocketsService } from './services/websockets.service';
import { ToastModule } from 'primeng/toast';
import { environment } from './environments/environment';
import { io } from 'socket.io-client';
import { FooterComponent } from './components/shared/footer/footer.component';
import { EditorModule } from 'primeng/editor';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, FooterComponent, EditorModule, GoogleMapsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ConfirmationService, MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title = 'HeartConnect';
  isLogged = false;

  private socket: any; 

  cards = [
    { imageUrl: 'path/to/image1.jpg', number: 1, description: 'Descripción 1' },
    { imageUrl: 'path/to/image2.jpg', number: 2, description: 'Descripción 2' },
  ];

  constructor(
    private primengConfig: PrimeNGConfig, 
    private messageService: MessageService, 
    private websocket: WebsocketsService
  ){}

  ngOnInit() {
    this.socket = io(environment.websocket)
  }
}
