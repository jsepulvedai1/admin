import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DriversComponent } from './drivers/drivers.component';
import { DriverDetailComponent } from './users-detail/driver-detail.component';

const routes: Routes = [
  { path: '', component: DriversComponent },
  { path: 'detail/:id', component: DriverDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriversRoutingModule {}
