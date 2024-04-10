import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MenuAdminComponent } from '../../shared/menu-admin/menu-admin.component';
import { TableModule } from 'primeng/table';
import { ImageModule } from 'primeng/image';
import { DialogComponent } from '../../utils/dialog/dialog.component';
import { FileUploadModule } from 'primeng/fileupload';
import * as Quill from 'quill';

@Component({
  selector: 'app-edit-text',
  standalone: true,
  imports: [ToastModule, FormsModule, MenuAdminComponent, TableModule, ImageModule, DialogComponent, FileUploadModule],
  templateUrl: './edit-text.component.html',
  styleUrl: './edit-text.component.css'
})
export class EditTextComponent implements OnInit {
  /* public content: string = '';

  text: string | undefined;
  title: string | undefined;
  textStructure: string | undefined;
  fotos?: Array<any>;
  arrPhotos?: Array<any>;
  noText = 'No hay imagenes';
  mutiple = true;
  updatePhotos?: any;
  arrUpdatePhotos?: any;
  constructor() { }
 */

  quill!: Quill.Quill;
  @ViewChild('editor') editor!: ElementRef;
  constructor() {

  }

 ngOnInit(): void {
  this.quill = new Quill!(this.editor.nativeElement, {
    theme: 'snow',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
      ]
    }
  });
}
}
