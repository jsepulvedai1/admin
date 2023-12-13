import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApproveWomanComponent } from './approve-woman/approve-woman.component';
import { ApprovesUserWomanDetailComponent } from './approves-user-woman-detail/approves-user-woman-detail.component';

const routes: Routes = [
  { path: '', component: ApproveWomanComponent },
  { path: 'detail/:id', component: ApprovesUserWomanDetailComponent }
];

//const routes: Routes = [{ path: '', component: WidgetsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveWomanUserRoutingModule {}
