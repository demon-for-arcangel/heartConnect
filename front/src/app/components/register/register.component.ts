import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('domicile') domicileInput!: ElementRef;
  suggestions: any[] = [];

  constructor(private http: HttpClient) {}

  onDomicileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchText = target.value;
    this.http.get<any[]>(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}`)
       .subscribe(response => {
         // Filtrar los resultados para incluir solo aquellos con el tipo "administrative"
         this.suggestions = response.filter(suggestion => suggestion.type === 'administrative');
       }, error => {
         console.error('Error fetching suggestions:', error);
       });
   }

  onBlur() {
    setTimeout(() => {
      if (this.suggestions.length > 0){
        this.suggestions = [];
      }
    }, 20000);
  }

  selectSuggestion(suggestion: any) {
    this.domicileInput.nativeElement.value = suggestion.display_name;
    this.suggestions = [];
  }
}