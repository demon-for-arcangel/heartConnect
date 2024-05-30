import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MenuComponent, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm: string = '';
  searchType: 'users' | 'events' = 'users';
  results: any[] = [];

  constructor(private userService: UserService) {}

  onSearch(): void {
    if (this.searchType === 'users') {
      this.userService.searchUsers(this.searchTerm).subscribe(
        users => {
          this.results = users;
        },
        error => {
          console.error('Error searching users:', error);
        }
      );
    }
  }
}
