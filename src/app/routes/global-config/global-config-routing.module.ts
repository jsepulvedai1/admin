import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GlobalConfigComponent } from './global-config/global-config.component';

const routes: Routes = [
  { path: '', component: GlobalConfigComponent }
  // { path: 'detail/:id', component: UsersDetailComponent }
];

//const routes: Routes = [{ path: '', component: WidgetsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalConfigRoutingModule {}
