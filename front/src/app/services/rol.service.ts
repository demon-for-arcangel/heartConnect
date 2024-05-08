import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }
  private baseUrl: string = environment.baseUrl;
  private urlShowRols: string = this.baseUrl + environment.showRols;

  getRols(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlShowRols}`);
  }
}
