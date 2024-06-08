import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PreferencesService } from '../../../services/preferences.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-preferences',
  standalone: true,
  imports: [MenuComponent, CommonModule, FormsModule],
  templateUrl: './edit-preferences.component.html',
  styleUrl: './edit-preferences.component.css',
  providers: [DialogService]
})
export class EditPreferencesComponent {
  relationshipTypeOptions: { id: number, type: string }[] = [];
  interestedInOptions: { id: number, gender: string }[] = [];

  relationshipType: string = '';
  sportsInterest: number = 0;
  artisticInterest: number = 0;
  politicalInterest: number = 0;
  hasChildren: boolean = false;
  wantsChildren: boolean = false;
  interestedIn: string = '';

  user: any = {};

  ref: DynamicDialogRef | undefined;

  constructor(
    private preferencesService: PreferencesService,
    private authService: AuthService,
    public dialogService: DialogService
  ){}

  ngOnInit(): void {
    const token = localStorage.getItem('user');
    if (token) {
      this.authService.getUserByToken(token).subscribe(user => {
        if (user && user.id) {
          this.user = user;
          console.log(this.user);

          this.preferencesService.getUserPreferences(this.user.id).subscribe(
            (data) => {
              console.log(data);
              this.relationshipType = data.relationship_type;
              this.sportsInterest = data.sports;
              this.artisticInterest = data.artistic;
              this.politicalInterest = data.politicians;
              this.hasChildren = data.has_children;
              this.wantsChildren = data.wants_children
              this.interestedIn = data.interest;

              this.loadOptions();
            },
            (error) => {
              console.error('Error al obtener las preferencias del usuario', error);
            }
          );
        }
      });
    } else {
      this.loadOptions();
    }
  }

  loadOptions(): void {
    this.preferencesService.getInterestedInOptions().subscribe(options => {
      this.interestedInOptions = options;
      if (this.interestedIn && !this.interestedInOptions.some(option => option.gender === this.interestedIn)) {
        this.interestedInOptions.unshift({ id: -1, gender: this.interestedIn });
      }
    });

    this.preferencesService.getRelationshipTypeOptions().subscribe(options => {
      this.relationshipTypeOptions = options;
      if (this.relationshipType && !this.relationshipTypeOptions.some(option => option.type === this.relationshipType)) {
        this.relationshipTypeOptions.unshift({ id: -1, type: this.relationshipType });
      }
    });
  }

  savePreferences(): void {
    // Obtener los IDs de las opciones seleccionadas
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

    this.preferencesService.editPreferences(this.user.id, preferencesData).subscribe(
      response => {
        console.log('Preferencias actualizadas exitosamente', response);
        setTimeout(() => {
          window.location.reload();
        }, 50);
      },
      error => {
        console.error('Error al actualizar las preferencias', error);
        alert('Error al actualizar las preferencias: ' + error.message);
      }
    );
  }
}
