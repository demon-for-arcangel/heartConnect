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
    const index = this.selectedUsers.indexOf(user);
    if (index > -1) {
       this.selectedUsers.splice(index, 1);
    } else {
       this.selectedUsers.push(user);
    }
    this.updateActionButtons();
  }

  updateActionButtons() {}

  deleteUsers() { //modificar para poder hacer que se eliminen uno o muchos
    
  }
}
