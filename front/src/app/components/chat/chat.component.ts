import { Component, } from '@angular/core';
import { RouterModule } from '@angular/router';
import io from 'socket.io-client';
import { UserFriendshipService } from '../../services/user-friendship.service';
import { User, UserFriendship } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebsocketsService } from '../../services/websockets.service';
import { UserService } from '../../services/user.service';
import { MenuComponent } from '../shared/menu/menu.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MenuComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  private socket = io('http://localhost:8090');
  friends: UserFriendship[] = [];
  chats: any[] = [];
  messages: any[] = [];
  user: any = {};
  activeSection: string = 'chats';
  newMessage: string = '';
  selectedFriend: UserFriendship | null = null;
  selectedChatId: string | null = null;

  constructor(
    private userFriendshipService: UserFriendshipService,
    private authService: AuthService,
    private websocketService: WebsocketsService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('user');
    this.authService.getUserByToken(token).subscribe(user => {
      if (user && user.id) {
        this.user = user.id.toString();
        this.loadFriends(this.user);
        this.socket.emit('login', this.user);
        this.loadUserChats();
      } else {
        console.error('No se ha encontrado una lista de amigos de este usuario.');
      }
    });

    this.socket.on('new-chat', (chat) => {
      this.chats.push(chat);
      this.filterFriendsWithoutChats();
    });

    this.socket.on('new-private-message', async (message) => {
      const sender = await this.getUserById(message.senderId);
      const senderName = sender ? `${sender.firstName} ${sender.lastName}` : 'Desconocido';
      this.messages.push({ ...message, senderName });

      setTimeout(() => {
        const messageContainer = document.querySelector('.message-container');
        if (messageContainer) {
          messageContainer.scrollTop = messageContainer.scrollHeight;
        }
      });
    });
  }

  async getUserById(userId: string): Promise<User | undefined> {
    return new Promise((resolve) => {
      this.userService.getUserById(userId).subscribe(user => {
        resolve(user);
      });
    });
  }

  loadFriends(userId: string) {
    this.userFriendshipService.showFriendship(userId).subscribe(friends => {
      if (friends) {
        this.friends = friends;
        this.filterFriendsWithoutChats();
      } else {
        console.error('No se ha encontrado una lista de amigos de este usuario.');
      }
    }, error => {
      console.error('Error al obtener los amigos del usuario:', error);
    });
  }

  loadUserChats() {
    this.websocketService.getUserChats(this.user).subscribe({
      next: (chats) => {
        this.chats = chats;
        this.filterFriendsWithoutChats();
      },
      error: (error) => {
        console.error('Error al obtener los chats del usuario:', error);
      }
    });
  }

  filterFriendsWithoutChats() {
    const chatFriendIds = this.chats.map(chat => chat.friend?.id);
    this.friends = this.friends.filter(friend => !chatFriendIds.includes(friend.id));
  }

  selectFriend(friend: UserFriendship) {
    this.selectedFriend = friend;
    this.selectedChatId = null;
    this.createOrLoadChat(this.user, friend.id.toString());
  }

  selectChat(chat: any) {
    this.selectedFriend = chat.friend;
    this.selectedChatId = chat.id ? chat.id.toString() : null;
    if (this.selectedChatId) {
      this.loadMessages(this.selectedChatId);
    }
  }

  createOrLoadChat(userId: string, friendId: string) {
    this.websocketService.createChat(userId, friendId).subscribe({
      next: (chat) => {
        this.selectedChatId = chat.id;
        this.loadMessages(chat.id);
      },
      error: (error) => {
        console.error('Error al crear o cargar el chat:', error);
      }
    });
  }

  loadMessages(chatId: string) {
    this.websocketService.getChatMessages(chatId).subscribe({
      next: (messages) => {
        this.messages = messages.map(msg => ({ ...msg, type: 'chat' }));
      },
      error: (error) => {
        console.error('Error al obtener los mensajes del chat:', error);
      }
    });
  }

  sendMessage() {
    const messageText = this.newMessage.trim();
    if (messageText && this.selectedChatId) {
      const recipientId = this.selectedChatId.toString();
      this.socket.emit('send-private-message', { recipientId, messageText });

      this.messages.push({ message: this.newMessage, sender: 'yo', type: 'chat' });
      this.newMessage = '';
      setTimeout(() => {
        const messageContainer = document.querySelector('.message-container');
        if (messageContainer) {
          messageContainer.scrollTop = messageContainer.scrollHeight;
        }
      });
    }
  }

  toggleSection(section: string) {
    this.activeSection = section;
  }
}