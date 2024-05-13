import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, catchError, of } from 'rxjs';
import { UserFriendship } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserFriendshipService {

  constructor(private http: HttpClient) { }
  private baseUrl: string = environment.baseUrl;
  private urlShowFriendship: string = this.baseUrl + environment.showFriendship;

  showFriendship(userId: string): Observable<UserFriendship[]> {
    const friendsUrl = `${this.urlShowFriendship}/${userId}`;
    return this.http.get<UserFriendship[]>(friendsUrl);
  }
}
