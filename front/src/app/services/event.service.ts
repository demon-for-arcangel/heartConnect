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
  //realizar en el servidor
  private urlActiveEvents: string = this.baseUrl + environment.activeEvents;
  private urlInactiveEvents: string = this.baseUrl + environment.inactiveEvents;
  private urlActivateEvents: string = this.baseUrl + environment.activateEvents;
  private urlDesactivateEvents: string = this.baseUrl + environment.desactivateEvents;
  private urlsearchEvent: string = this.baseUrl + environment.searchEvent;
  private urlInscriptions: string = this.baseUrl + environment.inscriptions; 
  
  createInscription(userId: string, eventId: string): Observable<any> {
    const body = { userId, eventId };
    return this.http.post<any>(this.urlInscriptions, body).pipe(
      catchError((error) => {
        console.error('Error al crear la inscripción:', error);
        return of(undefined);
      })
    );
  }

  createNewEvent(event: Event): Observable<Event | undefined> {
    return this.http.post<Event>(this.urlEvents, event).pipe(
      catchError((error) => {
        console.error('Error al crear un nuevo evento:', error);
        return of(undefined);
      })
    );
  } 
  
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.urlEvents);
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

  deleteEvent(eventsIds: number[]): Observable<any> {
    return this.http.delete(`${this.urlEvents}`, {
       body: { ids: eventsIds }
    });
  }

  activateEvent(eventsIds: number[]): Observable<any> {
    return this.http.put<any>(this.urlActivateEvents, { eventsIds: eventsIds }).pipe(
      catchError((error) => {
        console.error('Error al activar el evento:', error);
        return of(error);
      })
    );
  }

  desactivateEvent(eventsIds: number[]): Observable<any> {
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

  searchEvents(term: string): Observable<any[]> {
    const searchUrl = `${this.urlsearchEvent}/${term}`;
    return this.http.get<any[]>(searchUrl).pipe(
      catchError((error) => {
        console.error('Error al buscar eventos:', error);
        return of([]);
      })
    );
  }
}
