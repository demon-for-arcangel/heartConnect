import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  @ViewChild('domicile') domicileInput!: ElementRef;
  ngOnInit() {
    const geocodingClient = mbxGeocoding({ accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN' });

    this.domicileInput.nativeElement.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const searchText = target.value;
      geocodingClient.forwardGeocode({
        query: searchText,
        autocomplete: true,
        limit: 5
      })
      .send()
      .then((response: any) => {
        const suggestions = response.body.features;
        // Aquí puedes procesar las sugerencias y mostrarlas en el contenedor de sugerencias
        console.log(suggestions);
      });
    });
 }
}
