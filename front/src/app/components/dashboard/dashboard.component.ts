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

  constructor(private authService: AuthService, private preferencesService: PreferencesService,
    private recommendedUsersService: RecommendedUsersService
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

          this.preferencesService.getUserPreferences(this.userId).subscribe(
            (preferences) => {
              this.hasPreferences = !!preferences;

              if (this.userId) {
                this.recommendedUsersService.recommendUsers(this.userId.toString()).subscribe(
                  (users) => {
                    this.recommendedUsers = users;
                    this.currentUserIndex = 0; // Reset the index when new users are loaded
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
      });
    }
  }

  nextUser() {
    if (this.currentUserIndex < this.recommendedUsers.length - 1) {
      this.currentUserIndex++;
    }
  }

  prevUser() {
    if (this.currentUserIndex > 0) {
      this.currentUserIndex--;
    }
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
