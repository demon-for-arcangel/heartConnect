import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Event } from '../interfaces/event';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }
  private baseUrl: string = environment.baseUrl;
  //cambiar user a event y crearlos en el environment
  private urlShowUser: string = this.baseUrl + environment.showUser;
  private urlActiveUsers: string = this.baseUrl + environment.activeUsers;
  private urlInactiveUsers: string = this.baseUrl + environment.inactiveUsers;
  private urlDeleteUsers: string = this.baseUrl + environment.deleteUsers;
  private urlActivateUsers: string = this.baseUrl + environment.activateUsers;
  private urlDesactivateUsers: string = this.baseUrl + environment.desactivateUsers;
  private urlCreateUser: string = this.baseUrl + environment.createUser;
  private urlUpdateUser: string = this.baseUrl + environment.updateUser;

  createNewEvent(event: Event): Observable<Event | undefined> {
    return this.http.post<Event>(this.urlCreateUser, event).pipe(
      catchError((error) => {
        console.error('Error al crear un nuevo evento:', error);
        return of(undefined);
      })
    );
  }  

  getEventById(eventId: string): Observable<Event | undefined> {
    const eventUrl = `${this.urlShowUser}/${eventId}`;
    return this.http.get<Event>(eventUrl);
  }

  getActiveEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlActiveUsers}`);
  }

  getInactiveEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlInactiveUsers}`);
  }

  deleteEvent(eventsIds: string[]): Observable<any> {
    return this.http.delete(`${this.urlDeleteUsers}`, {
       body: { eventsIds: eventsIds }
    });
  }

  activateEvent(eventsIds: string[]): Observable<any> {
    return this.http.put<any>(this.urlActivateUsers, { eventsIds: eventsIds }).pipe(
      catchError((error) => {
        console.error('Error al activar el evento:', error);
        return of(error);
      })
    );
  }

  desactivateEvent(eventsIds: string[]): Observable<any> {
    return this.http.put<any>(this.urlDesactivateUsers, { eventsIds: eventsIds }).pipe(
      catchError((error) => {
        console.error('Error al desactivar el evento:', error);
        return of(error);
      })
    );
  }

  updateEvent(eventId: string, eventData: Partial<Event>): Observable<Event | undefined> {
    const updateUrl = `${this.urlUpdateUser}/${eventId}`;
    return this.http.put<Event>(updateUrl, eventData).pipe(
       catchError((error) => {
         console.error('Error al actualizar el evento:', error);
         return of(undefined);
       })
    );
  }
}
