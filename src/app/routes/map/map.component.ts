import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent {
  options: google.maps.MapOptions = {
    center: { lat: -33.4369436, lng: -70.634449 },
    zoom: 13
  };
  apiLoaded: Observable<boolean>;
  startPoint = { lat: -33.4369436, lng: -70.634449 };
  endPoint = { lat: -33.4172499, lng: -70.6075899 };
  distance: any = null;

  polylinePath = [
    { lat: -33.4369436, lng: -70.634449 },
    { lat: -33.4172499, lng: -70.6075899 }
  ];
  polylineOptions: google.maps.PolylineOptions = {
    strokeColor: '#0000FF',
    strokeOpacity: 1.0, // Opacidad de la línea (0.0 - 1.0)
    strokeWeight: 2 // Grosor de la línea
  };

  constructor(private httpClient: HttpClient) {
    this.apiLoaded = httpClient
      .jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAQGrMI9sktA1fEaPRWOHfA4LdoWTaxD5Y', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  // calculateDistance(): void {
  //   const service = new google.maps.DistanceMatrixService();
  //   service.getDistanceMatrix(
  //     {
  //       origins: ['39'],
  //       destinations: ['22'],
  //       travelMode: google.maps.TravelMode.DRIVING
  //     },
  //     (response, status) => {
  //       if (status === google.maps.DistanceMatrixStatus.OK) {
  //         this.distance = response?.rows[0].elements[0].distance.value;
  //       } else {
  //         console.error('Error al calcular la distancia:', status);
  //         this.distance = null;
  //       }
  //     }
  //   );
  // }
}
