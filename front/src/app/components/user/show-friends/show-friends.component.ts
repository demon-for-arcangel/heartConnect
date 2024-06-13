import { Component } from '@angular/core';
import { UserFriendship } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { UserFriendshipService } from '../../../services/user-friendship.service';

@Component({
  selector: 'app-show-friends',
  standalone: true,
  imports: [],
  templateUrl: './show-friends.component.html',
  styleUrl: './show-friends.component.css'
})
export class ShowFriendsComponent {
  friends: UserFriendship[] = [];
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private userFriendshipService: UserFriendshipService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('user');
    if (token) {
      this.authService.getUserByToken(token).subscribe(
        user => {
          if (user && user.id) {
            this.loadFriends(user.id.toString());
          } else {
            this.errorMessage = 'Usuario no encontrado';
          }
        },
        error => {
          this.errorMessage = 'Error al autenticar al usuario';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'No se encontró el token de usuario';
    }
  }

  loadFriends(userId: string) {
    this.userFriendshipService.showFriendship(userId).subscribe(
      friends => {
        this.friends = friends;
      },
      error => {
        this.errorMessage = 'Error al obtener la lista de amigos';
        console.error(error);
      }
    );
  }
}
