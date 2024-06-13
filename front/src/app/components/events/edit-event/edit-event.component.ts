import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../../services/event.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [FormsModule, GoogleMapsModule],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditEventComponent {
  @Input() eventId!: string;
  evento: any = {};
  latitude: number = 0;
  longitude: number = 0; 
  zoom: number = 12;

  constructor(private eventService: EventService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

  ngOnInit() {
    const eventId = this.config.data.eventId;
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe(evento => {
        if (evento) {
          this.evento = evento;
          this.latitude = evento.latitude || 0;
          this.longitude = evento.longitude || 0;
        } else {
          console.error('No se encontró el evento con el ID proporcionado.');
        }
      }, error => {
        console.error('Error al obtener los detalles del evento:', error);
      });
    }
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.latitude = event.latLng.lat();
      this.longitude = event.latLng.lng();
    }
  }

  updateEventData() {
    const eventId = this.evento.id;
    this.evento.latitude = this.latitude;
    this.evento.longitude = this.longitude;
    this.eventService.updateEvent(eventId, this.evento).subscribe(
      updatedEvent => {
        console.log('Evento actualizado con éxito:', updatedEvent);
        // hacer mensaje
        setTimeout(() => {
          location.reload();
        }, 3000);
      },
      error => {
        console.error('Error al actualizar el evento:', error);
        // hacer mensaje
      }
    );
  }
}
