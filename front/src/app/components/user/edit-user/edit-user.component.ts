import { Component, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  @Input() userId!: string;
  user: any = {};

  constructor(private userService: UserService, public ref: DynamicDialogRef, public config: DynamicDialogConfig){}

  ngOnInit() {
    const userId = this.config.data.userId;
    if (userId) {
      this.userService.getUserById(userId).subscribe(user => {
        if (user) {
          this.user = user;
          this.user.born_date = this.user.born_date ? new Date(this.user.born_date).toISOString().split('T')[0] : '';
        } else {
          console.error('No se encontró el usuario con el ID proporcionado.');
        }
      }, error => {
        console.error('Error al obtener los detalles del usuario:', error);
      });
    }
  }

  updateUserData() {
    const userId = this.user.id;
    this.userService.updateUser(userId, this.user).subscribe(
      updatedUser => {
        console.log('Usuario actualizado con éxito:', updatedUser);
        setTimeout(() => {
          location.reload();
        }, 3000);
      },
      error => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }
}
