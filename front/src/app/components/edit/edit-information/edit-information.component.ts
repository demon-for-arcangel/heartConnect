import { Component, OnInit } from '@angular/core';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from '../../utils/dialog/dialog.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-information',
  standalone: true,
  imports: [EditorModule, FormsModule, InputTextModule, ButtonModule, 
  DialogComponent, ToastModule, ToolbarModule, AvatarModule, TableModule,
  FileUploadModule, ImageModule],
  templateUrl: './edit-information.component.html',
  styleUrl: './edit-information.component.css',
  providers: [ConfirmationService, MessageService]
})
export class EditInformationComponent implements OnInit {
  text: string | undefined;
  title: string | undefined;

  
  constructor(){}

  ngOnInit(): void {
    
  }
}
