import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages'
import { User } from '../../interfaces/user';
import { Message } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MessagesModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User;
  showAlert: boolean = false;
  message: Message[] | undefined;

  constructor(private userService: UserService, private router: Router){
    this.user = {};
  }

  onEnter(event: KeyboardEvent){
    if (event.key == 'Enter'){
      this.login();
    }
  }

  validateForm(): boolean{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(this.user.email!)){
      this.showAlert = true;
      this.message = [{ severity: 'error', summary: 'Error', detail: 'Por favor, introduce una contraseña.', life: 3000 }];
      return false;
    }
    if (!this.user.password){
      this.showAlert = true;
      this.message = [{ severity: 'error', summary: 'Error', detail: 'Credenciales inválidas.', life: 3000 }];
      return false;
    }
    return true;
  }

  login(){
    if (this.validateForm()){
      this.userService.login(this.user).subscribe({
        next: (user: any | undefined) => {
          console.log(user)
          if (user.status >= 400){
            this.showAlert = true;
            this.message = [{ severity: 'error', summary: 'Error', detail: 'Credenciales inválidas.', life: 3000 }];
          }else{
            localStorage.clear();
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/home']);
            setTimeout(() => {
              window.location.reload();
            }, 50);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  ngOnInit(){
    if (localStorage.getItem('user') != null || localStorage.getItem('user') != undefined){
      
    }
  }
}
