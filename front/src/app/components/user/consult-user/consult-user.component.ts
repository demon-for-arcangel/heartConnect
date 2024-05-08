import { Component, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-consult-user',
  standalone: true,
  imports: [],
  templateUrl: './consult-user.component.html',
  styleUrl: './consult-user.component.css'
})
export class ConsultUserComponent {
  @Input() userId!: string;
  user: any = {};

  constructor(private userService: UserService, public ref: DynamicDialogRef, public config: DynamicDialogConfig){}

  ngOnInit() {
    const userId = this.config.data.userId;
    if (userId) {
      this.userService.getUserById(userId).subscribe(user => {
        if (user) {
          this.user = user;
        } else {
          console.error('No se encontró el usuario con el ID proporcionado.');
        }
      }, error => {
        console.error('Error al obtener los detalles del usuario:', error);
      });
    }
 }
}
