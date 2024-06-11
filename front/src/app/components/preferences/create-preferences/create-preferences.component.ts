import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PreferencesService } from '../../../services/preferences.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-preferences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-preferences.component.html',
  styleUrl: './create-preferences.component.css'
})
export class CreatePreferencesComponent {
  relationshipTypeOptions: { id: number, type: string }[] = [];
  interestedInOptions: { id: number, gender: string }[] = [];

  relationshipType: string = '';
  sportsInterest: number = 0;
  artisticInterest: number = 0;
  politicalInterest: number = 0;
  hasChildren: boolean = false;
  wantsChildren: boolean = false;
  interestedIn: string = '';

  userId: number | null = null; 

  ref: DynamicDialogRef | undefined;

  constructor(
    private preferencesService: PreferencesService,
    private authService: AuthService,
    public dialogService: DialogService,
    private router: Router
  ){}

  ngOnInit(): void {
    const token = localStorage.getItem('user');
    if (token) {
      this.authService.getUserByToken(token).subscribe(user => {
        if (user && user.id) {
          this.userId = user.id;
          console.log('ID del usuario:', this.userId);
        }
      });
    } 
    this.loadOptions();
  }

  loadOptions(): void {
    this.preferencesService.interestOptions().subscribe(options => {
      this.interestedInOptions = options;
      if (this.interestedIn && !this.interestedInOptions.some(option => option.gender === this.interestedIn)) {
        this.interestedInOptions.unshift({ id: -1, gender: this.interestedIn });
      }
    });

    this.preferencesService.relationshipOptions().subscribe(options => {
      this.relationshipTypeOptions = options;
      if (this.relationshipType && !this.relationshipTypeOptions.some(option => option.type === this.relationshipType)) {
        this.relationshipTypeOptions.unshift({ id: -1, type: this.relationshipType });
      }
    });
  }

  savePreferences(): void {
    const selectedRelationshipType = this.relationshipTypeOptions.find(option => option.type === this.relationshipType);
    const selectedInterest = this.interestedInOptions.find(option => option.gender === this.interestedIn);
  
    const preferencesData = {
      relationship_type: selectedRelationshipType ? selectedRelationshipType.id : null,
      sports: this.sportsInterest,
      artistic: this.artisticInterest,
      politicians: this.politicalInterest,
      has_children: this.hasChildren,
      wants_children: this.wantsChildren,
      interest: selectedInterest ? selectedInterest.id : null
    };
  
    console.log('Datos a enviar:', preferencesData);
  
    if (this.userId !== null) {
      console.log(this.userId)
      this.preferencesService.createPreferences(this.userId, preferencesData).subscribe(
        (response) => {
          console.log('Preferencias guardadas exitosamente', response);
          setTimeout(() => {
            window.location.reload();
          }, 50);
        },
        (error) => {
          console.error('Error al guardar las preferencias', error);
        }
      );
    } else {
      console.error('No se pudo obtener el ID del usuario');
    }
  }
  
}
