import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  images: File[] = []; 
  maxImages = 3;
  @Input() userId!: string;
  user: any = {};

  constructor(private userServices: UserService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit() {
    console.log(this.userId)
    const userId = this.config.data?.userId;
    console.log(userId)
    if (userId) {
      this.userServices.getUserById(userId).subscribe(user => {
        if (user) {
          this.user = user;
          console.log(this.user, 'usuario')
        } else {
          console.error('No se encontró el usuario con el ID proporcionado.');
        }
      }, error => {
        console.error('Error al obtener los detalles del usuario:', error);
      });
    }
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          if (this.images.length < this.maxImages) {
            this.images.push(file);
          } 
        }
      }
    }
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  openFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  getPreviewImage(image: string){}

  updateUserData() {
    const userId = this.user.id;
    this.userServices.updateUser(userId, this.user).subscribe(
      updatedUser => {
        console.log('Usuario actualizado con éxito:', updatedUser);
        // hacer mensaje
        setTimeout(() => {
          location.reload();
        }, 3000);
      },
      error => {
        console.error('Error al actualizar el usuario:', error);
        // hacer mensaje
      }
    );
  }
}
