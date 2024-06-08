import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventService } from '../../../services/event.service';
import { AuthService } from '../../../services/auth.service';

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
    private eventService: EventService,
    private authService: AuthService
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

  inscription(): void {
    this.authService.getUserByToken(localStorage.getItem('user')).subscribe(
      (user) => {
        if (user && user.id) {
          const userId: string = user.id.toString();
          const eventId: string = this.event.id.toString(); 
  
          this.eventService.createInscription(userId, eventId).subscribe(
            (response) => {
              console.log('Usuario inscrito exitosamente:', response);
            },
            (error) => {
              console.error('Error al inscribir al usuario en el evento:', error);
            }
          );
        } else {
          console.error('No se pudo obtener el ID del usuario');
        }
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }
}
