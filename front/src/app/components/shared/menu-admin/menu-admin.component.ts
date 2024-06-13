import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent {
  constructor(private authService: AuthService, private router: Router){}

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/']); 
  }
}
