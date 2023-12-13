import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { TripsComponent } from './trips/trips.component';

const routes: Routes = [
  { path: '', component: TripsComponent },
  { path: 'detail/:id', component: TripDetailComponent }
];

//const routes: Routes = [{ path: '', component: WidgetsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule {}
