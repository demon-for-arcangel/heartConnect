import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MailService } from '../../../services/mail.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuLogoComponent } from '../../shared/menu-logo/menu-logo.component';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-request-reset',
  standalone: true,
  imports: [FormsModule, MenuLogoComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './request-reset.component.html',
  styleUrl: './request-reset.component.css'
})
export class RequestResetComponent {
  resetForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private mailServices: MailService, private router: Router, private location: Location) {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  sendResetEmail() {
    if (this.resetForm.valid) {
      const email = this.resetForm.get('email')?.value;
      this.mailServices.sendMail({email: email}).subscribe(
        (response: any) => { 
          this.router.navigate(['/']); 
        },
        (error: any) => { 
          console.error('Error al enviar el correo de restablecimiento', error);
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }
}