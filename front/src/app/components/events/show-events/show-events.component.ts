import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../services/event.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConsultInformationComponent } from '../consult-information/consult-information.component';

@Component({
  selector: 'app-show-events',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './show-events.component.html',
  styleUrl: './show-events.component.css',
  providers: [DialogService]
})
export class ShowEventsComponent {
  events: any[] = [];

  ref: DynamicDialogRef | undefined;

  constructor(private eventService: EventService, public dialogService: DialogService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      (data) => {
        this.events = data.filter(event => event.public); 
        console.log(this.events);
      },
      (error) => {
        console.error('Error al obtener eventos:', error);
      }
    );
  }

  showInformation(eventId: number): void {
    this.ref = this.dialogService.open(ConsultInformationComponent, {
      header: 'Información del Evento',
      modal: true,
      width: '60%',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      styleClass: 'custom-modal',
      data: { eventId: eventId }
    });
  }
}
