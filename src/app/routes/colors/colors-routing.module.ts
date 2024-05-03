import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ColorsComponent } from './colors/colors.component';

const routes: Routes = [
  { path: '', component: ColorsComponent }
  // { path: 'detail/:id', component: ApprovesUserDetailComponent }
];

//const routes: Routes = [{ path: '', component: WidgetsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColorsRoutingModule {}
