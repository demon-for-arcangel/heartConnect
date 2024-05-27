import { Component, Input } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-consult-event',
  standalone: true,
  imports: [],
  templateUrl: './consult-event.component.html',
  styleUrl: './consult-event.component.css'
})
export class ConsultEventComponent {
  @Input() eventId!: string;
  event: any = {};

  constructor(private eventService: EventService, public ref: DynamicDialogRef, public config: DynamicDialogConfig){}

  ngOnInit() {
    const eventId = this.config.data.eventId;
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe(event => {
        if (event) {
          this.event = event;
        } else {
          console.error('No se encontró el evento con el ID proporcionado.');
        }
      }, error => {
        console.error('Error al obtener los detalles del evento:', error);
      });
    }
  }

}
