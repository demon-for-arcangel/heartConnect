import { Component, } from '@angular/core';
import { RouterModule } from '@angular/router';
import io from 'socket.io-client';
import { UserFriendshipService } from '../../services/user-friendship.service';
import { UserFriendship } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebsocketsService } from '../../services/websockets.service';

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
  chats: any[] = [];
  requests: any[] = [];
  chatRequests: any[] = [];
  messages: any[] = [];
  user: any = {};
  activeSection: string = 'chats';
  newMessage: string = '';
  selectedFriend: UserFriendship | null = null;
  selectedChatId: string | null = null;

  constructor(
    private userFriendshipService: UserFriendshipService,
    private authService: AuthService,
    private websocketService: WebsocketsService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('user');
    this.authService.getUserByToken(token).subscribe(user => {
      if (user && user.id) {
        this.user = user.id.toString(); // Asegurarse de que user.id es un string
        this.loadFriends(this.user);
        this.socket.emit('login', this.user);
        this.loadUserChats();
      } else {
        console.error('No se ha encontrado una lista de amigos de este usuario.');
      }
    });

    this.socket.on('new-chat', (chat) => {
      console.log('Nuevo chat recibido:', chat);
      this.chats.push(chat);
    });

    this.socket.on('new-private-message', (message) => {
      console.log('Mensaje privado recibido:', message);
      this.messages.push({ data: message, sender: 'otro usuario' });
      setTimeout(() => {
        const messageContainer = document.querySelector('.message-container');
        if (messageContainer) {
          messageContainer.scrollTop = messageContainer.scrollHeight;
        }
      });
    });
  }

  loadFriends(userId: string) {
    try {
      this.userFriendshipService.showFriendship(userId).subscribe(friends => {
        if (friends) {
          this.friends = friends;
        } else {
          console.error('No se ha encontrado una lista de amigos de este usuario.');
        }
      });
    } catch (error) {
      console.error('Error al obtener los amigos del usuario:', error);
    }
  }

  loadUserChats() {
    this.websocketService.getUserChats(this.user).subscribe({
      next: (chats) => {
        this.chats = chats;
      },
      error: (error) => {
        console.error('Error al obtener los chats del usuario:', error);
      }
    });
  }

  selectFriend(friend: UserFriendship) {
    console.log('Amigo seleccionado:', friend);
    this.selectedFriend = friend;
    // Aquí necesitarás ajustar para que selecciona un chat relacionado al amigo seleccionado
    this.loadMessages(this.selectedChatId); // Asegurarse de que friend.id es un string
  }

  selectChat(chat: any) {
    console.log('Chat seleccionado:', chat);
    this.selectedChatId = chat.id.toString(); // Asegurarse de que chat.id es un string
    this.loadMessages(this.selectedChatId); 
  }

  loadMessages(chatId: string | null) {
    if (chatId) {
      this.websocketService.getChatMessages(chatId).subscribe({
        next: (messages) => {
          this.messages = messages;
        },
        error: (error) => {
          console.error('Error al obtener los mensajes del chat:', error);
        }
      });
    }
  }

  sendMessage() {
    const message = this.newMessage.trim();
    console.log('Enviando mensaje:', message);
    console.log('Amigo seleccionado:', this.selectedFriend);

    if (message && this.selectedFriend) {
      const recipientId = this.selectedFriend.id.toString(); // Asegurarse de que recipientId es un string
      console.log('Enviando a:', recipientId);
      this.socket.emit('send-private-message', { recipientId, message });
      this.messages.push({ data: this.newMessage, sender: 'yo' });
      console.log('Mensajes actuales:', this.messages);
      this.newMessage = '';
      setTimeout(() => {
        const messageContainer = document.querySelector('.message-container');
        if (messageContainer) {
          messageContainer.scrollTop = messageContainer.scrollHeight;
        }
      });
    }
  }

  sendChatRequest(friend: UserFriendship) {
    const message = 'Solicitud de chat';
    this.socket.emit('send-chat-request', { recipientId: friend.id.toString(), message }); // Asegurarse de que recipientId es un string
  }

  acceptChatRequest(chatRequest: any) {
    this.socket.emit('accept-chat-request', { chatId: chatRequest.id.toString() }); // Asegurarse de que chatId es un string
  }

  toggleSection(section: string) {
    this.activeSection = section;
  }
}