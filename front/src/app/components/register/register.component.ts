import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
  dialogRef: DynamicDialogRef;

  constructor(private http: HttpClient, private userService: UserService, dialogRef: DynamicDialogRef, private router: Router, private route: ActivatedRoute, public config: DynamicDialogConfig, private messageService: MessageService) {
    this.dialogRef = dialogRef;
  }

  onSubmit() { 
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
    console.log(userData)

    this.userService.register(userData).subscribe(
      user => {
        console.log('Usuario registrado con éxito:', user);
        this.messageService.add({severity:'success', summary:'Éxito', detail:'Usuario registrado exitosamente. Espere a la activación de la cuenta.'});
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error => {
        console.error('Error al registrar el usuario:', error);
        this.messageService.add({severity:'error', summary:'Error', detail:'No se pudo registrar el usuario'});
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
    }, 2000);
  }

  selectSuggestion(suggestion: any) {
    this.domicileValue = suggestion.display_name;
    this.suggestions = [];
 }
}
