import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {
  user: any = {};
  userProfileImageUrl: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fileService: FileService
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
}