import { Component, Input } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { PreferencesService } from '../../../services/preferences.service';
import { AuthService } from '../../../services/auth.service';

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

  user: any = {};

  constructor(
    private preferencesService: PreferencesService,
    private authService: AuthService
  ) { }

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
              this.relationshipType = data.relationshipType;
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
  }
}