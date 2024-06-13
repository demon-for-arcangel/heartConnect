import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { GraphqlService } from '../../../services/graphql.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-show-like-users',
  standalone: true,
  imports: [],
  templateUrl: './show-like-users.component.html',
  styleUrl: './show-like-users.component.css'
})
export class ShowLikeUsersComponent {
  errorMessage: string = '';
  userInterests: any[] = [];
  userDetails: any[] = [];
  userId: number | null = null;

  constructor(
    private authService: AuthService,
    private graphqlService: GraphqlService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('user');
    if (token) {
      this.authService.getUserByToken(token).subscribe(
        user => {
          if (user && user.id) {
            this.userId = user.id;
            this.loadUserLike(user.id);
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

  loadUserLike(userId: number) {
    this.graphqlService.getUserPeopleInterests(userId).subscribe(
      userLikes => {
        this.userInterests = userLikes.data.userPeopleInterests || [];
        this.loadUserDetails();
      },
      error => {
        this.errorMessage = 'Error al obtener la lista de usuarios que te interesan';
        console.error(error);
      }
    );
  }

  loadUserDetails() {
    this.userDetails = [];
    if (Array.isArray(this.userInterests)) {
      this.userInterests.forEach(interest => {
        this.userService.getUserById(interest.personId).subscribe(
          userDetails => {
            this.userDetails.push(userDetails);
          },
          error => {
            console.error('Error al obtener los detalles del usuario', error);
          }
        );
      });
    }
  }
}
