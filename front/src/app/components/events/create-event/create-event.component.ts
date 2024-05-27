import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [ReactiveFormsModule, InputSwitchModule, CommonModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  eventForm!: FormGroup;
  roles: any[] = [];

  constructor(private fb: FormBuilder, private eventService: EventService){}

  ngOnInit() {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      des: ['', Validators.required],
      date: ['', [Validators.required]],
      public: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      this.eventService.createNewEvent(this.eventForm.value).subscribe(
        event => {
          console.log('Evento creado:', event);
        },
        error => {
          console.error('Error al crear el evento:', error);
        }
      );
    }
  }
}