import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  images: File[] = []; // Array para almacenar las imágenes seleccionadas
  maxImages = 3; // Número máximo de imágenes permitidas

  constructor() { }

  ngOnInit(): void { }

  onFileChange(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (const file of files) {
        // Validar tipo de archivo (opcional)
        if (file.type.startsWith('image/')) {
          if (this.images.length < this.maxImages) {
            this.images.push(file);
          } else {
            alert(`Solo se permiten ${this.maxImages} imágenes.`);
          }
        } else {
          alert('Solo se permiten archivos de imagen.');
        }
      }
    }
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  openFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  getPreviewImage(image: string){}
}
