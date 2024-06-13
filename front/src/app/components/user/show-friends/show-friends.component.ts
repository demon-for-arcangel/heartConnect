import { Component } from '@angular/core';
import { User, UserFriendship } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { UserFriendshipService } from '../../../services/user-friendship.service';
import { GraphqlService } from '../../../services/graphql.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-show-friends',
  standalone: true,
  imports: [],
  templateUrl: './show-friends.component.html',
  styleUrl: './show-friends.component.css'
})
export class ShowFriendsComponent {
  friends: UserFriendship[] = [];
  friendDetails: User[] = [];
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
        this.friends = response.data.getListFriends;
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
        console.warn('id_friendship es undefined para el amigo:', friend);
      }
    }
  }
  }
