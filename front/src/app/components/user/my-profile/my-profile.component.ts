import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {

}
