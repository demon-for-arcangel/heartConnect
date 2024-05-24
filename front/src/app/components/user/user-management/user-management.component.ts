import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogComponent } from '../../utils/dialog/dialog.component';
import { DialogModule } from '@angular/cdk/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { ConsultUserComponent } from '../consult-user/consult-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    MenuAdminComponent, CommonModule, ToastModule, DialogComponent, DialogModule, ConfirmDialogModule
    ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
  providers: [DialogService]
})
export class UserManagementComponent {
  activeUsers: any[] = [];
  inactiveUsers: any[] = [];
  selectedUsers: any[] = [];
  hasSelectedUsers: boolean = false;
  hasSelectedActiveUsers: boolean = false;
  hasSelectedInactiveUsers: boolean = false;
  allUsersSelected: boolean = false;

  ref: DynamicDialogRef | undefined;
  dialog: any;

  constructor(private userService: UserService, private messageService: MessageService, public dialogService: DialogService){}

  ngOnInit(){
    this.userService.getActiveUsers().subscribe(users => {
      this.activeUsers = users;
    });

    this.userService.getInactiveUsers().subscribe(users => {
      this.inactiveUsers = users;
    })
  }

  selectAllUsers(event: any, userType: string) {
    const isChecked = event.target.checked;
    let usersList = [];
   
    if (userType === 'active') {
       usersList = this.activeUsers;
    } else if (userType === 'inactive') {
       usersList = this.inactiveUsers;
    }
   
    usersList.forEach(user => {
       user.selected = isChecked;
    });
   
    this.updateSelectedUsers();
  }

  updateSelectedUsers() {
    const allActiveSelected = this.activeUsers.every(user => user.selected);
    const allInactiveSelected = this.inactiveUsers.every(user => user.selected);
    this.allUsersSelected = allActiveSelected && allInactiveSelected;
    this.hasSelectedUsers = this.activeUsers.some(user => user.selected) || this.inactiveUsers.some(user => user.selected);
   
    this.hasSelectedActiveUsers = this.activeUsers.some(user => user.selected);
    this.hasSelectedInactiveUsers = this.inactiveUsers.some(user => user.selected);
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
        this.messageService.add({
            severity:'info', 
            summary:'Información', 
            detail:'No hay usuarios seleccionados para eliminar.',
        });
        return;
    }
    
    this.userService.deleteUser(selectedUserIds).subscribe(
        response => {
            this.messageService.add({
                severity:'success', 
                summary:'Éxito', 
                detail:'Usuarios eliminados correctamente.',
            });
            setTimeout(() => {
                location.reload(); 
            }, 3000); 
        },
        error => {
            this.messageService.add({
                severity:'error', 
                summary:'Error', 
                detail:'Hubo un error al eliminar los usuarios.',
            });
        }
    );
  }
  
  activateSelectedUsers() {
    const selectedUserIds = this.inactiveUsers.filter(user => user.selected).map(user => user.id);
    if (selectedUserIds.length > 0) {
      this.userService.activateUser(selectedUserIds).subscribe(
        response => {
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Éxito', 
            detail: 'Usuarios activados correctamente.' 
          });
          setTimeout(() => {
            location.reload(); 
          }, 3000); 
        },
        error => {
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Hubo un error al activar los usuarios.' 
          });
        }
      );
    }
  }

  desactivateSelectedUsers() {
    const selectedUserIds = this.activeUsers.filter(user => user.selected).map(user => user.id);
    if (selectedUserIds.length > 0) {
      this.userService.desactivateUser(selectedUserIds).subscribe(
        response => {
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Éxito', 
            detail: 'Usuarios desactivados correctamente.' 
          });
          setTimeout(() => {
            location.reload(); 
          }, 3000); 
        },
        error => {
         this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Hubo un error al desactivar los usuarios.' 
        });
        }
      );
    }
  }

  newUser(): void {
    this.ref = this.dialogService.open(CreateUserComponent, {
      header: 'Agregar Nuevo Usuario',
      modal: true,
      width: '60%',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      styleClass: 'custom-modal'
    })
  }

  editUser(): void {
    const selectedUsers = [...this.activeUsers, ...this.inactiveUsers].filter(user => user.selected);
    if (selectedUsers.length > 1) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor, selecciona solo un usuario para consultar.',
      });
    } else if (selectedUsers.length === 1) {
      const selectedUser = selectedUsers[0];
      this.ref = this.dialogService.open(EditUserComponent, {
        header: 'Editar Usuario',
        modal: true,
        width: '60%',
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
        },
        styleClass: 'custom-modal',
        data: { userId: selectedUser.id }
      })
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Información',
        detail: 'Por favor, selecciona un usuario para consultar.',
      });
    }
  }

  consultUser(): void {
    const selectedUsers = [...this.activeUsers, ...this.inactiveUsers].filter(user => user.selected);
    if (selectedUsers.length > 1) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor, selecciona solo un usuario para consultar.',
      });
    } else if (selectedUsers.length === 1) {
      const selectedUser = selectedUsers[0];
      this.ref = this.dialogService.open(ConsultUserComponent, {
        header: 'Consultar Usuario',
        modal: true,
        width: '60%',
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
        },
        styleClass: 'custom-modal',
        data: { userId: selectedUser.id }
      });
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Información',
        detail: 'Por favor, selecciona un usuario para consultar.',
      });
    }
  }
}
