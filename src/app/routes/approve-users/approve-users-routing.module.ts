import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApprovesUserDetailComponent } from './approves-user-detail/approves-user-detail.component';
import { ApprovesUsersListComponent } from './approves-users-list/approves-users-list.component';

const routes: Routes = [
  { path: '', component: ApprovesUsersListComponent },
  { path: 'detail/:id', component: ApprovesUserDetailComponent }
];

//const routes: Routes = [{ path: '', component: WidgetsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveUserRoutingModule {}
