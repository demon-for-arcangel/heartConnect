import { Component } from '@angular/core';
import { MenuAdminComponent } from '../shared/menu-admin/menu-admin.component';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    MenuAdminComponent, CommonModule, 
    ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  activeUsers: any[] = [];
  inactiveUsers: any[] = [];

  constructor(private userService: UserService){}

  ngOnInit(){
    this.userService.getActiveUsers().subscribe(users => {
      this.activeUsers = users;
    });

    this.userService.getInactiveUsers().subscribe(users => {
      this.inactiveUsers = users;
    })
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => {
       // Actualiza las listas de usuarios después de eliminar
       this.ngOnInit();
    });
  }
}
