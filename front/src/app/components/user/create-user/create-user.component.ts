import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, InputSwitchModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService){}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      roles: ['', Validators.required],
      isActive: [true]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
       this.userService.createNewUser(this.userForm.value).subscribe(
         user => {
            console.log('Usuario creado:', user);
         },
         error => {
            console.error('Error al crear el usuario:', error);
         }
       );
    }
   }
}
