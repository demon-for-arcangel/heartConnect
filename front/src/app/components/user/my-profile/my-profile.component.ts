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
import { Router } from '@angular/router';

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
  maxNumberPhotos: number = 88;

  ref: DynamicDialogRef | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fileService: FileService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private router: Router,
    private cdr: ChangeDetectorRef
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

  deleteImage(imageId: number) {
    if (imageId) {
      this.fileService.deleteAsset(imageId).subscribe(
        (response) => {
          console.log('Imagen eliminada correctamente:', response);
          this.images = this.images.filter(img => img.id !== imageId);
        },
        (error) => {
          console.error('Error al eliminar la imagen:', error);
        }
      );
    } else {
      console.error('ID de imagen inválido:', imageId);
    }
  }

  addImage(fileInputEvent: any): void {
    const file = fileInputEvent.target.files[0];
    if (file && this.user.id) {
      this.fileService.uploadFile(file, this.user.id.toString()).subscribe({
        next: (response: any[]) => {
          console.log('Respuesta del servidor:', response);
          if (response && response.length > 0 && response[0].Asset) {
            const asset = response[0].Asset;
            const path = asset.path + '?t=' + new Date().getTime(); // Force reload by appending timestamp
            console.log('New image path:', path);
            this.images.push({ id: asset.id, path });
            this.previewImage = `"` + path + `"`;
            console.log('Preview image path:', this.previewImage);
            this.cdr.detectChanges(); // Trigger change detection
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

  navigatePreferences(){
    this.router.navigate(['/my-preferences']);
  }
  

  saveImage(): void {
    if (this.editingIndex !== null) {
      this.images[this.editingIndex].path = this.previewImage;
    }
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
