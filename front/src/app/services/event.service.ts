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
  private urlEvents: string = this.baseUrl + environment.events;
  //cambiar user a event y crearlos en el environment
  private urlActiveEvents: string = this.baseUrl + environment.activeUsers;
  private urlInactiveEvents: string = this.baseUrl + environment.inactiveUsers;
  private urlActivateEvents: string = this.baseUrl + environment.activateUsers;
  private urlDesactivateEvents: string = this.baseUrl + environment.desactivateUsers;

  createNewEvent(event: Event): Observable<Event | undefined> {
    return this.http.post<Event>(this.urlEvents, event).pipe(
      catchError((error) => {
        console.error('Error al crear un nuevo evento:', error);
        return of(undefined);
      })
    );
  } 
  
  getEvents(){

  }

  getEventById(eventId: string): Observable<Event | undefined> {
    const eventUrl = `${this.urlEvents}/${eventId}`;
    return this.http.get<Event>(eventUrl);
  }

  getActiveEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlActiveEvents}`);
  }

  getInactiveEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlInactiveEvents}`);
  }

  deleteEvent(eventsIds: string[]): Observable<any> {
    return this.http.delete(`${this.urlEvents}`, {
       body: { eventsIds: eventsIds }
    });
  }

  activateEvent(eventsIds: string[]): Observable<any> {
    return this.http.put<any>(this.urlActivateEvents, { eventsIds: eventsIds }).pipe(
      catchError((error) => {
        console.error('Error al activar el evento:', error);
        return of(error);
      })
    );
  }

  desactivateEvent(eventsIds: string[]): Observable<any> {
    return this.http.put<any>(this.urlDesactivateEvents, { eventsIds: eventsIds }).pipe(
      catchError((error) => {
        console.error('Error al desactivar el evento:', error);
        return of(error);
      })
    );
  }

  updateEvent(eventId: string, eventData: Partial<Event>): Observable<Event | undefined> {
    const updateUrl = `${this.urlEvents}/${eventId}`;
    return this.http.put<Event>(updateUrl, eventData).pipe(
       catchError((error) => {
         console.error('Error al actualizar el evento:', error);
         return of(undefined);
       })
    );
  }
}
