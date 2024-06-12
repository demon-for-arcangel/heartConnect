import { Component, OnInit } from '@angular/core';
import { MenuAdminComponent } from '../shared/menu-admin/menu-admin.component';
import { MenuComponent } from '../shared/menu/menu.component';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { environment } from '../../environments/environment';
import { SearchComponent } from '../shared/search/search.component';
import { CreatePreferencesComponent } from '../preferences/create-preferences/create-preferences.component';
import { PreferencesService } from '../../services/preferences.service';
import { DialogService } from 'primeng/dynamicdialog';
import { RecommendedUsersService } from '../../services/recommended-users.service';
import { FileService } from '../../services/file.service';
import { GraphqlService } from '../../services/graphql.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuAdminComponent, MenuComponent, FooterComponent, RouterLink, CardModule, SearchComponent, CreatePreferencesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [DialogService]
})
export class DashboardComponent implements OnInit {
  isAdmin: boolean = false;
  hasPreferences: boolean = false;
  userId: number | null = null;
  recommendedUsers: any[] = [];
  currentUserIndex: number = 0;
  errorMessage: string | null = null;
  userProfileImageUrl: string | null = null;
  user: any = null;
  userInterests: any[] = [];

  constructor(private authService: AuthService, private preferencesService: PreferencesService,
    private recommendedUsersService: RecommendedUsersService, private fileService: FileService,
    private graphQLService: GraphqlService
  ) {}
  
  ngOnInit() {
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  
    const token = localStorage.getItem('user');
    if (token) {
      this.authService.getUserByToken(token).subscribe(user => {
        if (user && user.id) {
          this.userId = user.id;
          this.user = user;
  
          this.graphQLService.getUserPeopleInterests(this.userId).subscribe(interests => {
            this.userInterests = interests.data.userPeopleInterests;
            console.log('User interests:', this.userInterests);  // Debug log
          });
  
          if (this.userId !== null) {
            this.preferencesService.getUserPreferences(this.userId).subscribe(
              (preferences) => {
                this.hasPreferences = !!preferences;
  
                if (this.userId) {
                  this.recommendedUsersService.recommendUsers(this.userId.toString()).subscribe(
                    (users) => {
                      this.recommendedUsers = users;
                      this.currentUserIndex = 0;
                      console.log(users)
  
                      this.updateUserProfileImage(this.user.photo_profile);
                    },
                    (error) => {
                      console.error('Error al obtener los usuarios recomendados', error);
                      this.errorMessage = 'Error al obtener los usuarios recomendados: ' + (error.message || error.statusText);
                    }
                  );
                }
              },
              (error) => {
                if (error.status === 404) {
                  console.error('No se encontraron preferencias para el usuario, mostrando el formulario de creación.');
                  this.hasPreferences = false;
                } else {
                  console.error('Error al obtener las preferencias del usuario', error);
                }
              }
            );
          }
        }
      });
    }
  }
  

  updateUserProfileImage(photoProfile: string) {
    if (photoProfile) {
      this.fileService.getFileById(photoProfile).subscribe({
        next: (response: { filePath: string }) => {
          this.userProfileImageUrl = response.filePath;
          console.log('URL de la imagen del perfil:', this.userProfileImageUrl);
        },
        error: error => {
          console.error('Error al obtener la imagen del perfil:', error);
        }
      });
    }
  }

  nextUser() {
    if (this.currentUserIndex < this.recommendedUsers.length - 1) {
      this.currentUserIndex++;
      this.updateUserProfileImage(this.recommendedUsers[this.currentUserIndex].photo_profile);
    }
  }

  prevUser() {
    if (this.currentUserIndex > 0) {
      this.currentUserIndex--;
      this.updateUserProfileImage(this.recommendedUsers[this.currentUserIndex].photo_profile);
    }
  }

  likeUser() {
    if (this.userId && this.recommendedUsers[this.currentUserIndex]) {
      const personId = this.recommendedUsers[this.currentUserIndex].id;
      this.graphQLService.addUserPeopleInterest(this.userId, personId).subscribe({
        next: (response) => {
          console.log('User liked successfully:', response);
          this.userInterests.push({ id: response.data.addUserPeopleInterest.id, userId: this.userId, personId });
        },
        error: (error) => {
          console.error('Error liking user:', error);
        }
      });
    }
  }

  deleteUserInterest() {
    if (this.userId && this.recommendedUsers[this.currentUserIndex]) {
      const personId = this.recommendedUsers[this.currentUserIndex].id;
      console.log('Deleting interest for personId:', personId);
  
      const interest = this.userInterests.find(i => i.personId === personId);
  
      if (interest) { 
        console.log('Found interest:', interest);
  
        this.graphQLService.deleteUserPeopleInterest(interest.id).subscribe({
          next: (response) => {
            console.log('User interest deleted successfully:', response);
            this.userInterests = this.userInterests.filter(i => i.id!== interest.id);
          },
          error: (error) => {
            console.error('Error deleting user interest:', error);
            if (error.errors && error.errors.length > 0) {
              console.error('Server error messages:', error.errors.map((e: { message: string }) => e.message));
              alert(`Error removing interest: ${error.errors[0].message}`);
            }
          }
        });
      } else {
        console.error('Interest not found for personId:', personId);
        alert('Interest not found for the selected user.');
      }
    } else {
      console.error('Invalid state: userId or current recommended user is missing.', { userId: this.userId, recommendedUsers: this.recommendedUsers, currentUserIndex: this.currentUserIndex });
      alert('Invalid state: Please select a user first.');
    }
  }

  userLikesPerson(personId: number): boolean {
    return !!this.userInterests.find(i => i.personId === personId);
  }
  
  cards: any[] = [
    {
      id_rol: environment.rol_admin,
      image: environment.admin_card_image,
      title: 'Gestión de Usuarios',
      content: 'Gestión de usuarios',
      link: '/user-management',
    },
    {
      id_rol: environment.rol_admin,
      image: environment.admin_card_image,
      title: 'Gestión de Eventos',
      content: 'Gestión de los eventos para la aplicación.',
      link: '/events-management'
    }
  ];
}
