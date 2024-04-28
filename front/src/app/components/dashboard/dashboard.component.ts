import { Component, OnInit } from '@angular/core';
import { MenuAdminComponent } from '../shared/menu-admin/menu-admin.component';
import { MenuComponent } from '../shared/menu/menu.component';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuAdminComponent, MenuComponent, FooterComponent, RouterLink, CardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  cards: any[] = [
    {
      id_rol: environment.rol_admin,
      image: environment.admin_card_image,
      title: 'Panel de usuarios',
      content: 'Gestión de usuarios',
      link: '/users',
    },
    {
      id_rol: environment.rol_redactor,
      image: environment.redactor_card_image,
      title: 'Panel del redactor',
      content: 'Para la gestión de las noticias',
      link: '/list-news',
    },
  ];
}
