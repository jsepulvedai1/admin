import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarListModule } from '@delon/abc/avatar-list';
import { EllipsisModule } from '@delon/abc/ellipsis';
import { FooterToolbarModule } from '@delon/abc/footer-toolbar';
import { FullContentModule } from '@delon/abc/full-content';
import { TagSelectModule } from '@delon/abc/tag-select';
import { G2MiniBarModule } from '@delon/chart/mini-bar';
import { CurrencyPipeModule } from '@delon/util';
import { SharedModule } from '@shared';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

import { DriversComponent } from './drivers/drivers.component';
import { DriversRoutingModule } from './drivers-routing.module';
import { UsersModule } from '../users/users.module';
import { NzCardModule } from 'ng-zorro-antd/card';
import { DriverDetailComponent } from './users-detail/driver-detail.component';

@NgModule({
  declarations: [DriversComponent, DriverDetailComponent],
  imports: [
    CommonModule,
    NzEmptyModule,
    NzTimelineModule,
    SharedModule,
    EllipsisModule,
    TagSelectModule,
    AvatarListModule,
    FooterToolbarModule,
    NzPaginationModule,
    NzStepsModule,
    CurrencyPipeModule,
    G2MiniBarModule,
    FullContentModule,
    DriversRoutingModule,
    AvatarListModule,
    FooterToolbarModule,
    NzPaginationModule,
    NzStepsModule,
    CurrencyPipeModule,
    G2MiniBarModule,
    FullContentModule,
    UsersModule,
    NzCardModule
  ]
})
export class DriversModule {}
