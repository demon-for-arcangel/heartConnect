import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../../services/event.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css'
})
export class EditEventComponent {
  @Input() eventId!: string;
  event: any = {};

  constructor(private eventService: EventService, public ref: DynamicDialogRef, public config: DynamicDialogConfig){}

  ngOnInit() {
    const eventId = this.config.data.eventId;
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe(user => {
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

  updateEventData() {
    const eventId = this.event.id;
    this.eventService.updateEvent(eventId, this.event).subscribe(
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
