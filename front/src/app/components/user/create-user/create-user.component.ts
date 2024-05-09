import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { UserService } from '../../../services/user.service';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, InputSwitchModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  userForm!: FormGroup;
  roles: any[] = [];

  constructor(private fb: FormBuilder, private userService: UserService, private rolService: RolService){}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      born_date: ['', Validators.required],
      domicile: ['', Validators.required],
      phone_number: ['', Validators.required],
      roles: ['', Validators.required],
      active: [true]
    });

    this.rolService.getRols().subscribe(roles => {
      this.roles = roles;
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
