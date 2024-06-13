import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  opcionesMenu = [
    { nombre: 'Ver eventos disponibles', accion: 'verEventos' },
    { nombre: 'Modo noche', accion: 'modoNoche' },
  ];

  constructor(private authService: AuthService, private router: Router){}

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/']); 
  }
}
