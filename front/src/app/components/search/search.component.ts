import { Component } from '@angular/core';
import { MenuComponent } from '../shared/menu/menu.component';
import { UserService } from '../../services/user.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm: string = '';
  searchType: 'users' | 'events' = 'users';
  results: any[] = [];

  constructor(private userService: UserService, private eventService: EventService) {}

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
    } else if (this.searchType === 'events') {
      this.eventService.searchEvents(this.searchTerm).subscribe(
        events => {
          this.results = events;
        },
        error => {
          console.error('Error searching events:', error);
        }
      );
    }
  }
}
