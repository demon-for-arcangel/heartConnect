import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

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
    // Puedes agregar más opciones aquí
  ];

  ejecutarAccion(accion: string) {
    // Implementa la lógica para cada opción del menú
    if (accion === 'verEventos') {
      // Lógica para ver eventos disponibles
    } else if (accion === 'modoNoche') {
      // Lógica para activar el modo noche
    }
  }
}
