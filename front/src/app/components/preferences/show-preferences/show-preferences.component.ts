import { Component, Input } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { PreferencesService } from '../../../services/preferences.service';

@Component({
  selector: 'app-show-preferences',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './show-preferences.component.html',
  styleUrl: './show-preferences.component.css'
})
export class ShowPreferencesComponent {
  relationshipType: string = '';
  sportsInterest: number = 0;
  artisticInterest: number = 0;
  politicalInterest: number = 0;
  hasOrWantsChildren: boolean = false;
  interestedIn: string = '';

  constructor(private preferencesService: PreferencesService) { }

  ngOnInit(): void {
    this.preferencesService.getUserPreferences(userId).subscribe(
      (data) => {
        this.relationshipType = data.relationshipType;
        this.sportsInterest = data.sportsInterest;
        this.artisticInterest = data.artisticInterest;
        this.politicalInterest = data.politicalInterest;
        this.hasOrWantsChildren = data.hasOrWantsChildren;
        this.interestedIn = data.interestedIn;
      },
      (error) => {
        console.error('Error al obtener las preferencias del usuario', error);
      }
    );
  }
}