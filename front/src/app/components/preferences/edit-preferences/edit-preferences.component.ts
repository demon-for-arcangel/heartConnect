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
  relationshipTypeOptions: string[] = [];
  interestedInOptions: string[] = [];

  relationshipType: string = '';
  sportsInterest: number = 0;
  artisticInterest: number = 0;
  politicalInterest: number = 0;
  hasOrWantsChildren: boolean = false;
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
          console.log(this.user)
  
          this.preferencesService.getUserPreferences(this.user.id).subscribe(
            (data) => {
              console.log(data)
              this.relationshipType = data.relationship_type;
              this.sportsInterest = data.sports;
              this.artisticInterest = data.artistic;
              this.politicalInterest = data.politicians;
              this.hasOrWantsChildren = data.hasOrWantsChildren;
              this.interestedIn = data.interest;
            },
            (error) => {
              console.error('Error al obtener las preferencias del usuario', error);
            }
          );
        }
      })
    }
    this.preferencesService.getInterestedInOptions().subscribe(options => {
      this.interestedInOptions = options;
    });

    this.preferencesService.getRelationshipTypeOptions().subscribe(options => {
      this.relationshipTypeOptions = options;
    });
  }
}
