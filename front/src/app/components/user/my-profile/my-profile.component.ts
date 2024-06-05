import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { FileService } from '../../../services/file.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { ShowFriendsComponent } from '../show-friends/show-friends.component';
import { ShowLikeUsersComponent } from '../show-like-users/show-like-users.component';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../shared/menu/menu.component';
import { Image } from '../../../interfaces/assets';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  providers: [DialogService]
})
export class MyProfileComponent implements OnInit {
  user: any = {};
  userProfileImageUrl: string = '';
  images: any[] = [];
  editingIndex: number | null = null;
  previewImage: string = '';
  editing: boolean = false;
  maxNumberPhotos: number = 60;

  ref: DynamicDialogRef | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fileService: FileService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private cd: ChangeDetectorRef
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
            if (this.user.photo_profile) {
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

            if (this.user.id) {
              this.fileService.getUserAssets(this.user.id).subscribe({
                next: (assets: any[]) => {
                  console.log('Assets del usuario:', assets);
                  this.images = assets;
                },
                error: (error) => {
                  console.error('Error al obtener los assets del usuario:', error);
                }
              });
            }
          });
        }
      });
    }
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
      data: { userId: this.user.id }
    });
  }

  editImage(index: number): void {
    this.editingIndex = index;
    this.editing = true;
    this.previewImage = this.images[index].path;
  }

  deleteImage(index: number): void {
    this.images.splice(index, 1);
  }

  addImage(fileInputEvent: any): void {
    const file = fileInputEvent.target.files[0];
    if (file && this.user.id) {
      this.fileService.uploadFile(file, this.user.id.toString()).subscribe({
        next: (response: any[]) => {
          console.log('Respuesta del servidor:', response);
          if (response && response.length > 0 && response[0].Asset) {
            const asset = response[0].Asset;
            this.images.push({ id: asset.id, path: asset.path });
            console.log('Ruta de la imagen subida:', asset.path);
            this.loadImages()  // Forzar la detección de cambios
          }
        },
        error: (error) => {
          console.error('Error al subir la imagen:', error);
        }
      });
    }
  }
  
  loadImages(): void {
    if (this.user.id) {
      this.fileService.getUserAssets(this.user.id).subscribe({
        next: (assets: any[]) => {
          console.log('Assets del usuario:', assets);
          this.images = assets;
          setTimeout(() => {
            window.location.reload();
          }, 50);
        },
        error: (error) => {
          console.error('Error al obtener los assets del usuario:', error);
        }
      });
    }
  }
  

  saveImage(): void {
    if (this.editingIndex !== null) {
      this.images[this.editingIndex].path = this.previewImage;
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
