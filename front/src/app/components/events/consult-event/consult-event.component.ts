import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-consult-event',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './consult-event.component.html',
  styleUrl: './consult-event.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConsultEventComponent {
  @Input() eventId!: string;
  event: any = {};
  latitude: number = 0;
  longitude: number = 0;
  zoom: number = 20;

  constructor(private eventService: EventService, public ref: DynamicDialogRef, public config: DynamicDialogConfig){}

  ngOnInit() {
    const eventId = this.config.data.eventId;
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe(event => {
        if (event) {
          this.event = event;
          console.log(this.event)
          this.latitude = event.latitude !== undefined ? parseFloat(event.latitude.toString()) : 0;
          this.longitude = event.longitude !== undefined ? parseFloat(event.longitude.toString()) : 0;
          console.log(this.latitude)
          console.log(this.longitude)
        } else {
          console.error('No se encontró el evento con el ID proporcionado.');
        }
      }, error => {
        console.error('Error al obtener los detalles del evento:', error);
      });
    }
  }

}
