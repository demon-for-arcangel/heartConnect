import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  socket?: any

  constructor() { 
    this.socket = io(environment.websocket)
    this.socket.on('connect', () => {
      console.log('conectado');
    })
    this.socket.on('disconnect', () => {
      console.log('Desconectado');
    });
  }

  getUserChats(userId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit('get-user-chats', userId, (response: any) => {
        if (response.success) {
          resolve(response.chats);
        } else {
          reject(response.error);
        }
      });
    });
  }
}
