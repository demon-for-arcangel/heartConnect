import { Component } from '@angular/core';
import { MenuHomeComponent } from '../shared/menu-home/menu-home.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [MenuHomeComponent, FooterComponent],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent {

}
