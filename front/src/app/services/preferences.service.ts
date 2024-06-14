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
  private urlpreferences: string = this.baseUrl + environment.preferences;
  private urlGetOptionsRelation: string = this.baseUrl + environment.preferences + environment.getOptionsRelation;
  private urlGetOptionsInterest: string = this.baseUrl + environment.preferences + environment.getOptionsInterest;
  private urlOptionsRel: string = this.baseUrl + environment.optionRelation;
  private urlOptionInt: string = this.baseUrl + environment.optionInterest;

  getUserPreferences(userId: number): Observable<any> {
    const url = `${this.urlpreferences}/${userId}`;
    return this.http.get<any>(url);
  }

  getRelationshipTypeOptions(): Observable<{ id: number, type: string }[]> {
    return this.http.get<{ id: number, type: string }[]>(`${this.urlGetOptionsRelation}`);
  }

  getInterestedInOptions(): Observable<{ id: number, gender: string }[]> {
    return this.http.get<{ id: number, gender: string }[]>(`${this.urlGetOptionsInterest}`);
  }

  relationshipOptions(): Observable<{ id: number, type: string }[]> {
    return this.http.get<{ id: number, type: string }[]>(`${this.urlOptionsRel}`);
  }

  interestOptions(): Observable<{ id: number, gender: string }[]> {
    return this.http.get<{ id: number, gender: string }[]>(`${this.urlOptionInt}`);
  }

  editPreferences(userId: string, preferencesData: any): Observable<any> {
    const url = `${this.urlpreferences}/${userId}`;
    return this.http.put<any>(url, preferencesData).pipe(
      catchError(error => {
        console.error('Error al actualizar las preferencias', error);
        return of(null);
      })
    );
  }

  createPreferences(userId: number, preferences: any): Observable<any> {
    return this.http.post(`${this.urlpreferences}/${userId}`, preferences);
  }
}
