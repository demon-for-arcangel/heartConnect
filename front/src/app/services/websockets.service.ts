import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../environments/environment';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  socket?: any
  private baseUrl: string = environment.baseUrl;
  private urlShowChatsUserId: string = this.baseUrl + environment.showChatsUser;

  constructor(private http: HttpClient) { 
    this.socket = io(environment.websocket)
    this.socket.on('connect', () => {
      console.log('conectado');
    })
    this.socket.on('disconnect', () => {
      console.log('Desconectado');
    });
  }

  getUserChats(userId: string): Observable<any[]> {
    const friendsUrl = `${this.urlShowChatsUserId}/${userId}`;
    return this.http.get<any[]>(friendsUrl);
  }
}
