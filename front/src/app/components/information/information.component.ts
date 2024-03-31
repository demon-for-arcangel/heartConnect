import { Component } from '@angular/core';
import { MenuHomeComponent } from '../shared/menu-home/menu-home.component';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [MenuHomeComponent],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent {

}
