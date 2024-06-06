import { Component, Input } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';

@Component({
  selector: 'app-show-preferences',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './show-preferences.component.html',
  styleUrl: './show-preferences.component.css'
})
export class ShowPreferencesComponent {
  @Input() relationshipType: string = '';
  @Input() sportsInterest: number = 0;
  @Input() artisticInterest: number = 0;
  @Input() politicalInterest: number = 0;
  @Input() hasOrWantsChildren: boolean = false;
  @Input() interestedIn: string = '';

  constructor() { }
}