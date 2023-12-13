import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardV1Component } from './v1/v1.component';

const routes: Routes = [{ path: '', component: DashboardV1Component }];

//const routes: Routes = [{ path: '', component: WidgetsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
