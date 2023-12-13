import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BanksComponent } from './banks/banks.component';

const routes: Routes = [
  { path: '', component: BanksComponent }
  // { path: 'detail/:id', component: ApprovesUserDetailComponent }
];

//const routes: Routes = [{ path: '', component: WidgetsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanksRoutingModule {}
