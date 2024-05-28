import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css',
  providers: [DialogService]
})
export class MyProfileComponent implements OnInit {
  user: any = {};
  userProfileImageUrl: string = '';

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
      data: { id: this.user.id }
    });
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
      data: { id: this.user.id }
    });
  }

  showLikeUsers(): void {
    this.ref = this.dialogService.open(ShowLikeUsersComponent, {
      header: 'Lista de Personas que me Interesan',
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
