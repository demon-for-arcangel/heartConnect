import { Component } from '@angular/core';
import { MenuAdminComponent } from '../shared/menu-admin/menu-admin.component';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

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
  selectedUsers: any[] = [];
  hasSelectedUsers: boolean = false;
  allUsersSelected: boolean = false;

  constructor(private userService: UserService){}

  ngOnInit(){
    this.userService.getActiveUsers().subscribe(users => {
      this.activeUsers = users;
    });

    this.userService.getInactiveUsers().subscribe(users => {
      this.inactiveUsers = users;
    })
  }

  selectAllUsers(event: any) {
    const isChecked = event.target.checked;
    this.activeUsers.forEach(user => {
       user.selected = isChecked;
    });
    this.inactiveUsers.forEach(user => {
       user.selected = isChecked;
    });
    this.updateSelectedUsers();
   }

   updateSelectedUsers() {
    const allActiveSelected = this.activeUsers.every(user => user.selected);
    const allInactiveSelected = this.inactiveUsers.every(user => user.selected);
    this.allUsersSelected = allActiveSelected && allInactiveSelected;
    this.hasSelectedUsers = this.activeUsers.some(user => user.selected) || this.inactiveUsers.some(user => user.selected);
   }

   toggleSelect(user: any) {
    user.selected = !user.selected;
    this.updateSelectedUsers(); 
   }

  updateActionButtons() {}

  deleteUsers() {
    const selectedUserIds = [...this.activeUsers, ...this.inactiveUsers]
        .filter(user => user.selected)
        .map(user => user.id);
    
    if (selectedUserIds.length === 0) {
        console.log('No hay usuarios seleccionados para eliminar.');
        return;
    }
    
    this.userService.deleteUser(selectedUserIds).subscribe(
        response => {
          console.log('Usuarios eliminados:', response);
        },
        error => {
          console.error('Error al eliminar usuarios:', error);
        }
    );
  }
  
  //hacer funcion para activar y desactivar cuentas
}
