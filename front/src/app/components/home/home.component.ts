import { Component } from '@angular/core';
import { MenuHomeComponent } from '../shared/menu-home/menu-home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from '@angular/cdk/dialog';
import { DialogComponent } from '../utils/dialog/dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuHomeComponent, ConfirmDialogModule, DialogModule, DialogComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DialogService]
})
export class HomeComponent {
  constructor(private messageService: MessageService, /* private router: Router, private route: ActivatedRoute, */ public dialogService: DialogService) {}

  ref: DynamicDialogRef | undefined;
  dialog: any;

  openLogin(): void {
    this.ref = this.dialogService.open(LoginComponent, {
      header: 'Inicio de Sesión',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      styleClass: 'custom-modal'
    })
  }

  openRegister(): void {
    this.ref = this.dialogService.open(RegisterComponent, {
      header: 'Registro',
      modal: true,
      breakpoints: {
        '900px': '75vw',
        '600px': '90vw'
      },
      styleClass: 'custom-modal'
    })
  }
}