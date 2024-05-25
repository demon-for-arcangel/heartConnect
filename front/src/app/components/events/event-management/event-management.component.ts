import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { DialogComponent } from '../../utils/dialog/dialog.component';
import { DialogModule } from '@angular/cdk/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-event-management',
  standalone: true,
  imports: [
    MenuAdminComponent, CommonModule, ToastModule, DialogComponent, DialogModule, ConfirmDialogModule
  ],
  templateUrl: './event-management.component.html',
  styleUrl: './event-management.component.css',
  providers: [DialogService]
})
export class EventManagementComponent {

}
