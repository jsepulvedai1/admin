import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelRatessComponent } from './travel-ratess/travel-ratess.component';

// import { CreateUserComponent } from './create-user/create-user.component';
// import { UserDetailEditComponent } from './user-detail-edit/user-detail-edit.component';
// import { UsersComponent } from './users/users.component';
// import { UsersDetailComponent } from './users-detail/users-detail.component';

const routes: Routes = [{ path: '', component: TravelRatessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelRatessgRoutingModule {}
