import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ColorsComponent } from './colors/colors.component';
import { ColorsEditComponent } from './colors-edit/colors-edit.component';

const routes: Routes = [
  { path: '', component: ColorsComponent },
  { path: 'detail/:id', component: ColorsEditComponent }
];

//const routes: Routes = [{ path: '', component: WidgetsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColorsRoutingModule {}
