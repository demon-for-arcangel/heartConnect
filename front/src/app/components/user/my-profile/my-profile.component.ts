import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import { FileService } from '../../../services/file.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ListFriendsComponent } from '../list-friends/list-friends.component';
import { ShowFriendsComponent } from '../show-friends/show-friends.component';
import { ShowLikeUsersComponent } from '../show-like-users/show-like-users.component';
import { Assets } from '../../../interfaces/assets';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css',
  providers: [DialogService]
})
export class MyProfileComponent implements OnInit {
  user: any = {};
  userProfileImageUrl: string = '';
  images: { imageUrl: string }[] = [];
  editingIndex: number | null = null;
  previewImage: string = '';
  editing: boolean = false;
  index: number = 0;
  maxNumberPhotos: number = 3;
  placeholders: number[] = [];

  ref: DynamicDialogRef | undefined;
  
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fileService: FileService,
    public dialogService: DialogService,
    private messageService: MessageService
  ) {}
  
  ngOnInit() {
    const token = localStorage.getItem('user');
    console.log('token del usuario', token);
    
    if (token) {
      this.authService.getUserByToken(token).subscribe(user => {
        if (user && user.id) {
          this.userService.getUserById(user.id.toString()).subscribe(userData => {
            this.user = userData;
            console.log('Usuario:', this.user);
            if (this.user?.photo_profile) {
              this.fileService.getFileById(this.user.photo_profile).subscribe({
                next: (response: { filePath: string }) => {
                  this.userProfileImageUrl = response.filePath;
                  console.log('URL de la imagen del perfil:', this.userProfileImageUrl);
                },
                error: error => {
                  console.error('Error al obtener la imagen del perfil:', error);
                }
              });
            }
          });
        }
      });
    }
    this.placeholders = Array(this.maxNumberPhotos).fill(0).map((_, i) => i);
  }
  
  editProfile(): void {
    this.ref = this.dialogService.open(EditProfileComponent, {
      header: 'Editar Mi Perfil',
      modal: true,
      width: '60%',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      styleClass: 'custom-modal',
      data: { userId: this.user.id } // Asegúrate de pasar `userId` en el objeto `data`
    });
  }
  
    editImage(index: number): void {
      this.editingIndex = index;
      this.editing = true;
      this.previewImage = this.images[index].imageUrl;
    }
  
    deleteImage(index: number): void {
      // Lógica para eliminar la imagen en el índice dado
      this.images.splice(index, 1);
    }
  
    addImage(): void {
      // Lógica para añadir una nueva imagen
    }
  
    saveImage(): void {
      if (this.editingIndex !== null) {
        this.images[this.editingIndex].imageUrl = this.previewImage;
        this.cancelEditing();
      }
    }
  
    cancelEditing(): void {
      this.editingIndex = null;
      this.editing = false;
      this.previewImage = '';
    }
  
    saveAllImages(): void {
      console.log('Guardando todas las imágenes...');
    }
  
    showFriends(): void {
      this.ref = this.dialogService.open(ShowFriendsComponent, {
        header: 'Lista de Amigos',
        modal: true,
        width: '60%',
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
        },
        styleClass: 'custom-modal',
      });
    }
  
    showLikeUsers(): void {
      this.ref = this.dialogService.open(ShowLikeUsersComponent, {
        header: 'Personas que me gustan',
        modal: true,
        width: '60%',
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
        },
        styleClass: 'custom-modal',
        data: { id: this.user.id }
      });
    }
  }
  