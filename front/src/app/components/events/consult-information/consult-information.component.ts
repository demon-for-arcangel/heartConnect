import { Component, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventService } from '../../../services/event.service';
import { AuthService } from '../../../services/auth.service';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-consult-information',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './consult-information.component.html',
  styleUrl: './consult-information.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ConsultInformationComponent {
  event: any;
  latitude: number = 0;
  longitude: number = 0;
  zoom: number = 20;

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
        if (data) {
          this.event = data;
          this.latitude = data.latitude !== undefined ? parseFloat(data.latitude.toString()) : 0;
          this.longitude = data.longitude !== undefined ? parseFloat(data.longitude.toString()) : 0;
          console.log(this.latitude)
          console.log(this.longitude)
        }
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
