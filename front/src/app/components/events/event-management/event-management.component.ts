import { Component } from '@angular/core';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { DialogComponent } from '../../utils/dialog/dialog.component';
import { DialogModule } from '@angular/cdk/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventService } from '../../../services/event.service';
import { MessageService } from 'primeng/api';
import { CreateEventComponent } from '../create-event/create-event.component';
import { EditEventComponent } from '../edit-event/edit-event.component';
import { ConsultEventComponent } from '../consult-event/consult-event.component';

@Component({
  selector: 'app-event-management',
  standalone: true,
  imports: [
    MenuAdminComponent, CommonModule, ToastModule, DialogComponent, DialogModule, ConfirmDialogModule
  ],
  templateUrl: './event-management.component.html',
  styleUrl: './event-management.component.css',
  providers: [DialogService]
})
export class EventManagementComponent {
  activeEvents: any[] = [];
  inactiveEvents: any[] = [];
  allEvents: any[] = [];
  selectedEvents: any[] = [];
  hasSelectedEvents: boolean = false;
  hasSelectedActiveEvents: boolean = false;
  hasSelectedInactiveEvents: boolean = false;
  allEventsSelected: boolean = false;
  isEditable: boolean = true;

  activeSection: string = 'todos';

  ref: DynamicDialogRef | undefined;

  constructor(private eventService: EventService, private messageService: MessageService, public dialogService: DialogService) {}

  ngOnInit() {
    this.loadAllEvents();
  }

  loadAllEvents() {
    this.eventService.getEvents().subscribe(events => {
      this.allEvents = events;
      this.updateSelectedEvents();
    });
    this.eventService.getActiveEvents().subscribe(events => {
      this.activeEvents = events;
      this.updateSelectedEvents();
    });
    this.eventService.getInactiveEvents().subscribe(events => {
      this.inactiveEvents = events;
      this.updateSelectedEvents();
    });
  }

  selectAllEvents(event: any, eventType: string) {
    const isChecked = event.target.checked;
    let eventsList = [];

    if (eventType === 'active') {
      eventsList = this.activeEvents;
    } else if (eventType === 'inactive') {
      eventsList = this.inactiveEvents;
    } else if (eventType === 'todos') {
      eventsList = this.allEvents;
    }

    eventsList.forEach(eventItem => {
      eventItem.selected = isChecked;
    });

    this.updateSelectedEvents();
  }

  updateSelectedEvents() {
    this.hasSelectedEvents = this.allEvents.some(event => event.selected);
    this.hasSelectedActiveEvents = this.activeEvents.some(event => event.selected);
    this.hasSelectedInactiveEvents = this.inactiveEvents.some(event => event.selected);
    this.allEventsSelected = this.allEvents.every(event => event.selected);
  }

  toggleSelect(event: any) {
    event.selected = !event.selected;
    this.updateSelectedEvents();
  }

  toggleSection(section: string) {
    this.activeSection = section;
    this.updateSelectedEvents();
  }

  deleteEvents() {
    const selectedEventIds = this.getSelectedEventIds();
    if (selectedEventIds.length === 0) {
      this.messageService.add({
        severity: 'info',
        summary: 'Información',
        detail: 'No hay eventos seleccionados para eliminar.',
      });
      return;
    }

    this.eventService.deleteEvent(selectedEventIds).subscribe(
      response => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Eventos eliminados correctamente.',
        });
        setTimeout(() => {
          this.loadAllEvents();
        }, 3000);
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un error al eliminar los eventos.',
        });
      }
    );
  }

  activateSelectedEvents() {
    const selectedEventIds = this.getSelectedEventIds('inactive');
    if (selectedEventIds.length > 0) {
      this.eventService.activateEvent(selectedEventIds).subscribe(
        response => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Eventos activados correctamente.'
          });
          setTimeout(() => {
            this.loadAllEvents();
          }, 3000);
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un error al activar los eventos.'
          });
        }
      );
    }
  }

  desactivateSelectedEvents() {
    const selectedEventIds = this.getSelectedEventIds('active');
    if (selectedEventIds.length > 0) {
      this.eventService.desactivateEvent(selectedEventIds).subscribe(
        response => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Eventos desactivados correctamente.'
          });
          setTimeout(() => {
            this.loadAllEvents();
          }, 3000);
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un error al desactivar los eventos.'
          });
        }
      );
    }
  }

  newEvent(): void {
    this.ref = this.dialogService.open(CreateEventComponent, {
      header: 'Agregar Nuevo Evento',
      modal: true,
      width: '60%',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      styleClass: 'custom-modal'
    });
  }

  editEvent(): void {
    const selectedEvents = this.getSelectedEvents();
    if (selectedEvents.length > 1) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor, selecciona solo un evento para editar.',
      });
    } else if (selectedEvents.length === 1) {
      const selectedEvent = selectedEvents[0];
      if (this.isEventEditable(selectedEvent)) {
        this.ref = this.dialogService.open(EditEventComponent, {
          header: 'Editar Evento',
          modal: true,
          width: '60%',
          breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
          },
          styleClass: 'custom-modal',
          data: { eventId: selectedEvent.id }
        });
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: 'No se puede editar un evento con fecha pasada.',
        });
      }
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Información',
        detail: 'Por favor, selecciona un evento para editar.',
      });
    }
  }

  consultEvent(): void {
    const selectedEvents = this.getSelectedEvents();
    if (selectedEvents.length > 1) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor, selecciona solo un evento para consultar.',
      });
    } else if (selectedEvents.length === 1) {
      const selectedEvent = selectedEvents[0];
      this.ref = this.dialogService.open(ConsultEventComponent, {
        header: 'Consultar Evento',
        modal: true,
        width: '60%',
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
        },
        styleClass: 'custom-modal',
        data: { eventId: selectedEvent.id }
      });
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Información',
        detail: 'Por favor, selecciona un evento para consultar.',
      });
    }
  }

  trackEvent(index: number, event: any): number {
    return event.id;
  }

  getSelectedEventIds(eventType?: string): number[] {
    let eventsList = [];
  
    if (eventType === 'active') {
      eventsList = this.activeEvents;
    } else if (eventType === 'inactive') {
      eventsList = this.inactiveEvents;
    } else {
      eventsList = this.allEvents;
    }
  
    return eventsList.filter(event => event.selected).map(event => event.id);
  }  

  getSelectedEvents(): any[] {
    return this.allEvents.filter(event => event.selected);
  }

  isEventEditable(event: any): boolean {
    const now = new Date();
    const eventDate = new Date(event.date);
    return eventDate >= now; 
  }
}

