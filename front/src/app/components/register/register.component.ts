import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('domicile') domicileInput!: ElementRef;
  suggestions: any[] = [];
  domicileValue: string = '';

  constructor(private http: HttpClient, private userService: UserService) {}

  onSubmit() { //hacer
    const firstname = (document.getElementById('firstname') as HTMLInputElement).value;
    const lastname = (document.getElementById('lastname') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const domicile = this.domicileValue;
    const birthdate = (document.getElementById('birthdate') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement).value;

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const userData = {
      firstName: firstname,
      lastName: lastname,
      password: password,
      email: email,
      domicile: domicile,
      born_date: birthdate,
      phone_number: phone,
    };

    this.userService.register(userData).subscribe(
      user => {
        console.log('Usuario registrado con éxito:', user);
      },
      error => {
        console.error('Error al registrar el usuario:', error);
      }
    );
 }

  onDomicileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchText = target.value;
    this.http.get<any[]>(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}`)
       .subscribe(response => {
         this.suggestions = response.filter(suggestion => suggestion.type === 'administrative');
       }, error => {
         console.error('Error fetching suggestions:', error);
       });
   }

  onBlur() {
    setTimeout(() => {
      if (this.suggestions.length > 0){
        this.suggestions = [];
      }
    }, 20000);
  }

  selectSuggestion(suggestion: any) {
    this.domicileValue = suggestion.display_name;
    this.suggestions = [];
 }
}
