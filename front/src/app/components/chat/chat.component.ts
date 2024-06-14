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
import { GraphqlService } from '../../services/graphql.service';

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
  friendDetails: User[] = []; 
  chats: any[] = [];
  messages: any[] = [];
  user: any = {};
  activeSection: string = 'chats';
  newMessage: string = '';
  selectedFriend: UserFriendship | null = null;
  selectedChatId: string | null = null;
  errorMessage: string = '';

  constructor(
    private userFriendshipService: UserFriendshipService,
    private authService: AuthService,
    private websocketService: WebsocketsService,
    private userService: UserService,
    private graphService: GraphqlService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('user');
    this.authService.getUserByToken(token).subscribe(user => {
      if (user && user.id) {
        this.user = user.id.toString();
        this.loadFriends(Number(this.user));
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

  loadFriends(userId: number) {
    this.graphService.getListFriends(userId).subscribe(
      response => {
        if (response && response.data && response.data.getListFriends) {
          this.friends = response.data.getListFriends;
          this.loadFriendDetails();
        } else {
          this.errorMessage = 'No se recibieron datos válidos al cargar la lista de amigos';
        }
      },
      error => {
        this.errorMessage = 'Error al cargar la lista de amigos';
        console.error(error);
      }
    );
  }
  

  loadFriendDetails() {
    this.friendDetails = [];
    for (let friend of this.friends) {
      if (friend.id_friendship !== undefined) {
        this.userService.getUserById(friend.id_friendship.toString()).subscribe(
          user => {
            if (user) {
              this.friendDetails.push(user);
              console.log(this.friendDetails);
            } else {
              console.error('Usuario no encontrado para id_friendship:', friend.id_friendship);
            }
          },
          error => {
            this.errorMessage = 'Error al cargar los detalles de los amigos';
            console.error(error);
          }
        );
      } else {
        console.error('id_friendship es undefined para el amigo:', friend);
      }
    }
  }


  loadUserChats() {
    this.websocketService.getUserChats(this.user).subscribe({
      next: (chats) => {
        this.chats = chats;
        this.filterFriendsWithoutChats();
        console.log(this.chats);
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
    const messageContent = this.newMessage.trim();
    if (messageContent && this.selectedChatId) {
      const chatId = this.selectedChatId;
      const senderId = this.user;
      console.log('Enviando mensaje:', { chatId, messageContent, senderId }); 
      this.socket.emit('send-private-message', { chatId, messageContent, senderId });
  
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