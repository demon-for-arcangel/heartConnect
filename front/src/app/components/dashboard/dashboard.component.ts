import { Component } from '@angular/core';
import { MenuAdminComponent } from '../shared/menu-admin/menu-admin.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuAdminComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
