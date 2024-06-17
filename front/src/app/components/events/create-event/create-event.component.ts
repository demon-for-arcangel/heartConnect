import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EventService } from '../../../services/event.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [ReactiveFormsModule, InputSwitchModule, CommonModule, GoogleMapsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateEventComponent {
  eventForm!: FormGroup;
  latitude: number = 40.4165;
  longitude: number = -3.70256; 
  zoom: number = 12;

  constructor(private fb: FormBuilder, private eventService: EventService, private messageService: MessageService) {}

  ngOnInit() {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      des: ['', Validators.required],
      date: ['', [Validators.required]],
      public: [false, Validators.required], 
      latitude: [this.latitude, Validators.required],
      longitude: [this.longitude, Validators.required],
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      this.eventService.createNewEvent(this.eventForm.value).subscribe(
        event => {
          console.log('Evento creado:', event);
          this.messageService.add({severity:'success', summary:'Éxito', detail:'Evento creado exitosamente'});
          setTimeout(() => {
            window.location.reload()
          }, 1500);
        },
        error => {
          console.error('Error al crear el evento:', error);
          this.messageService.add({severity:'error', summary:'Error', detail:'No se pudo crear el evento'});
        }
      );
    }
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.latitude = event.latLng.lat();
      this.longitude = event.latLng.lng();
      this.eventForm.patchValue({
        latitude: this.latitude,
        longitude: this.longitude
      });
    }
  }
}