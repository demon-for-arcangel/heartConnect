import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { UserFriendship } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { UserFriendshipService } from '../../../services/user-friendship.service';

@Component({
  selector: 'app-list-friends',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './list-friends.component.html',
  styleUrl: './list-friends.component.css'
})
export class ListFriendsComponent {
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
