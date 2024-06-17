import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { FriendDetails, UserFriendship } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { UserFriendshipService } from '../../../services/user-friendship.service';
import { GraphqlService } from '../../../services/graphql.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-list-friends',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './list-friends.component.html',
  styleUrl: './list-friends.component.css'
})
export class ListFriendsComponent {
  friends: UserFriendship[] = [];
  friendDetails: FriendDetails[] = [];
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private graphService: GraphqlService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('user');
    if (token) {
      this.authService.getUserByToken(token).subscribe(
        user => {
          if (user && user.id) {
            this.loadFriends(user.id);
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

  loadFriends(userId: number) {
    this.graphService.getListFriends(userId).subscribe(
      response => {
        const uniqueFriendsMap: { [key: string]: boolean } = {}; 
        const uniqueFriends: UserFriendship[] = []; 
  
        response.data.getListFriends.forEach((friend: UserFriendship) => {
          if (friend.id_friendship!== undefined &&!uniqueFriendsMap[friend.id_friendship]) {
            uniqueFriendsMap[friend.id_friendship] = true; 
            uniqueFriends.push(friend);
          }
        });
  
        this.friends = uniqueFriends;
        console.log('lista', this.friends);
        this.loadFriendDetails();
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
      if (friend.id_friendship !== undefined && friend.id !== undefined) {
        this.userService.getUserById(friend.id_friendship.toString()).subscribe(
          user => {
            if (user) {
              this.friendDetails.push({ user, friendshipId: friend.id_friendship, listId: friend.id });
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
        console.warn('id_friendship o friend.id es undefined para el amigo:', friend);
      }
    }
  }

  deleteFriend(listId: number) {
    if (listId === undefined) {
      console.error('El ID de la relación de amistad es undefined');
      return;
    }
    console.log(listId);
    this.graphService.deleteUserFriends(listId).subscribe({
      next: (response) => {
        if (response.data.deleteUserFriendShip.success) {
          this.friends = this.friends.filter(friend => friend.id !== listId);
          this.friendDetails = this.friendDetails.filter(detail => detail.friendshipId !== listId);
        } else {
          console.error('Error al eliminar amigo:', response.data.deleteUserFriendShip.message);
          this.errorMessage = `Error al eliminar amigo: ${response.data.deleteUserFriendShip.message}`;
        }
      },
      error: (err) => {
        this.errorMessage = 'Error al eliminar al amigo';
        console.error(err);
      }
    });
  }
}
