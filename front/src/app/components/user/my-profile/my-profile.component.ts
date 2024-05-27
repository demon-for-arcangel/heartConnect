import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  user: any = {};

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('user');
    this.authService.getUserByToken(token).subscribe(user => {
      if (user && user.id) {
        this.user = user.id.toString();
      } else {
        console.error('No se ha encontrado el usuario.');
      }
    });
  }
}
