import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

import { MapComponent } from './map.component';
import { MapRoutingModule } from './trips-routing.module';
@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, GoogleMapsModule, HttpClientModule, HttpClientJsonpModule, MapRoutingModule],
  exports: [MapComponent]
})
export class MapModule {}
