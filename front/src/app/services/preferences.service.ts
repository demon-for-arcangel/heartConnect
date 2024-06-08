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
  private urlGetOptionsRelation: string = this.baseUrl + environment.getPreferencesById + environment.getOptionsRelation;
  private urlGetOptionsInterest: string = this.baseUrl + environment.getPreferencesById + environment.getOptionsInterest;

  getUserPreferences(userId: string): Observable<any> {
    const url = `${this.urlGetPreferencesById}/${userId}`;
    return this.http.get<any>(url);
  }

  getRelationshipTypeOptions(): Observable<{ id: number, type: string }[]> {
    return this.http.get<{ id: number, type: string }[]>(`${this.urlGetOptionsRelation}`);
  }

  getInterestedInOptions(): Observable<{ id: number, gender: string }[]> {
    return this.http.get<{ id: number, gender: string }[]>(`${this.urlGetOptionsInterest}`);
  }

  editPreferences(userId: string, preferencesData: any): Observable<any> {
    const url = `${this.urlGetPreferencesById}/${userId}`;
    return this.http.put<any>(url, preferencesData).pipe(
      catchError(error => {
        console.error('Error al actualizar las preferencias', error);
        return of(null);
      })
    );
  }
}
