import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor(private http: HttpClient) { }
  private baseUrl: string = environment.baseUrl;
  private urlGetPreferencesById: string = this.baseUrl + environment.getPreferencesById;

  getUserPreferences(userId: string): Observable<any> {
    const url = `${this.urlGetPreferencesById}/${userId}`;
    return this.http.get<any>(url);
  }

  getRelationshipTypeOptions(): Observable<string[]> {
    return this.http.get<string[]>('api/preferences/relationOptions');
  }

  getInterestedInOptions(): Observable<string[]> {
    return this.http.get<string[]>('api/preferences/interestOptions');
  }
}
