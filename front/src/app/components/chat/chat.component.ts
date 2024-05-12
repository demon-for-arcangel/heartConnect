import { Component, } from '@angular/core';
import { RouterModule } from '@angular/router';
import io from 'socket.io-client';
import { UserFriendshipService } from '../../services/user-friendship.service';
import { UserFriendship } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  private socket = io('http://localhost:8090');
  friends: any = {};
  chats: any = {};
  messages: any = {};
  user: any = {};

  constructor(private userFriendshipService: UserFriendshipService, private authService: AuthService) {}

  sendMessage() {
    this.socket.emit('message', { data: 'Hello from client!' });
  }

  ngOnInit() {
    let token = localStorage.getItem('user');

    this.authService.getUserByToken(token).subscribe(user => {
      console.log(this.user)
      if (user) {
        this.user = user;
        console.log(this.user)
      } else {
        console.error('NO se ha encontrado una lista de amigos de este usuario.');
      }
    });
  }

  loadFriends(userId: string) {
    console.log(this.user.id)
    try {
      this.userFriendshipService.showFriendship(this.user.id).subscribe(friends => {
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