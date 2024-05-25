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
  selectedEvents: any[] = [];
  hasSelectedEvents: boolean = false;
  hasSelectedActiveEvents: boolean = false;
  hasSelectedInactiveEvents: boolean = false;
  allEventsSelected: boolean = false;

  ref: DynamicDialogRef | undefined;
  dialog: any;

  constructor(private eventService: EventService, private messageService: MessageService, public dialogService: DialogService){}

  ngOnInit(){
    this.eventService.getActiveEvents().subscribe(events => {
      this.activeEvents = events;
    });

    this.eventService.getInactiveEvents().subscribe(events => {
      this.inactiveEvents = events;
    })
  }

  selectAllEvents(event: any, eventType: string) {
    const isChecked = event.target.checked;
    let eventsList = [];
   
    if (eventType === 'active') {
      eventsList = this.activeEvents;
    } else if (eventType === 'inactive') {
      eventsList = this.inactiveEvents;
    }
   
    eventsList.forEach(event => {
       event.selected = isChecked;
    });
   
    this.updateSelectedEvents();
  }

  updateSelectedEvents() {
    const allActiveSelected = this.activeEvents.every(event => event.selected);
    const allInactiveSelected = this.inactiveEvents.every(event => event.selected);
    this.allEventsSelected = allActiveSelected && allInactiveSelected;
    this.hasSelectedEvents = this.activeEvents.some(event => event.selected) || this.inactiveEvents.some(event => event.selected);
   
    this.hasSelectedActiveEvents = this.activeEvents.some(event => event.selected);
    this.hasSelectedInactiveEvents = this.inactiveEvents.some(event => event.selected);
  }

  toggleSelect(event: any) {
    event.selected = !event.selected;
    this.updateSelectedEvents(); 
  }

/*   updateActionButtons() {}
 */
  deleteEvents() {
    const selectedEventIds = [...this.activeEvents, ...this.inactiveEvents]
        .filter(event => event.selected)
        .map(event => event.id);
    
    if (selectedEventIds.length === 0) {
        this.messageService.add({
            severity:'info', 
            summary:'Información', 
            detail:'No hay eventos seleccionados para eliminar.',
        });
        return;
    }
    
    this.eventService.deleteEvent(selectedEventIds).subscribe(
        response => {
            this.messageService.add({
                severity:'success', 
                summary:'Éxito', 
                detail:'Eventos eliminados correctamente.',
            });
            setTimeout(() => {
                location.reload(); 
            }, 3000); 
        },
        error => {
            this.messageService.add({
                severity:'error', 
                summary:'Error', 
                detail:'Hubo un error al eliminar los eventos.',
            });
        }
    );
  }
  
  activateSelectedEvents() {
    const selectedEventIds = this.inactiveEvents.filter(event => event.selected).map(event => event.id);
    if (selectedEventIds.length > 0) {
      this.eventService.activateEvent(selectedEventIds).subscribe(
        response => {
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Éxito', 
            detail: 'Eventos activados correctamente.' 
          });
          setTimeout(() => {
            location.reload(); 
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
    const selectedEventIds = this.activeEvents.filter(event => event.selected).map(event => event.id);
    if (selectedEventIds.length > 0) {
      this.eventService.desactivateEvent(selectedEventIds).subscribe(
        response => {
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Éxito', 
            detail: 'Eventos desactivados correctamente.' 
          });
          setTimeout(() => {
            location.reload(); 
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
    })
  }

  editEvent(): void {
    const selectedEvents = [...this.activeEvents, ...this.inactiveEvents].filter(event => event.selected);
    if (selectedEvents.length > 1) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor, selecciona solo un evento para consultar.',
      });
    } else if (selectedEvents.length === 1) {
      const selectedEvent = selectedEvents[0];
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
      })
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Información',
        detail: 'Por favor, selecciona un evento para consultar.',
      });
    }
  }

  consultEvent(): void {
    const selectedEvents = [...this.activeEvents, ...this.inactiveEvents].filter(event => event.selected);
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
}
