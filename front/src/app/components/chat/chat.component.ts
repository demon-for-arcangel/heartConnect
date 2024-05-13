import { Component, } from '@angular/core';
import { RouterModule } from '@angular/router';
import io from 'socket.io-client';
import { UserFriendshipService } from '../../services/user-friendship.service';
import { UserFriendship } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  private socket = io('http://localhost:8090');
  friends: UserFriendship[] = [];
  chats: any = {};
  messages: any[] = [];
  user: any = {};
  activeSection: string = 'chats';
  newMessage: string = '';

  constructor(private userFriendshipService: UserFriendshipService, private authService: AuthService) {}

  sendMessage() {
    const message = this.newMessage.trim();
    
    if (message) {
      this.socket.emit('message', { data: message });
      console.log('Mensaje enviado:', this.newMessage);
      this.messages.push({ data: this.newMessage });
      this.newMessage = '';
    }
    setTimeout(() => {
      const messageContainer = document.querySelector('.message-container');
      if (messageContainer) {
          messageContainer.scrollTop = messageContainer.scrollHeight;
      }
  });
  }
  

  toggleSection(section: string) {
    this.activeSection = section;
  }

  ngOnInit() {
    let token = localStorage.getItem('user');
  
    this.authService.getUserByToken(token).subscribe(user => {
      console.log(this.user)
      if (user) {
        this.user = user.id;
        console.log(this.user)
        this.loadFriends(this.user);
      } else {
        console.error('NO se ha encontrado una lista de amigos de este usuario.');
      }
    });
  }  

  loadFriends(userId: string) { // ver porque no devuelve la lista de amigos de un usuario y solo devuelve '{}'
    console.log(userId)
    try {
      this.userFriendshipService.showFriendship(userId).subscribe(friends => {
        console.log(this.friends)
        if (friends) {
          this.friends = friends;
        } else {
          console.error('NO se ha encontrado una lista de amigos de este usuario.');
        }
      });
    } catch (error) {
      console.error('Error al obtener los amigos del usuario:', error);
    }
  }
}