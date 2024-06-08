import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-consult-information',
  standalone: true,
  imports: [],
  templateUrl: './consult-information.component.html',
  styleUrl: './consult-information.component.css'
})
export class ConsultInformationComponent {
  event: any;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const eventId = this.config.data.eventId;
    this.eventService.getEventById(eventId).subscribe(
      (data) => {
        this.event = data;
      },
      (error) => {
        console.error('Error al obtener la información del evento:', error);
      }
    );
  }

  inscription(){}
}
