import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarListModule } from '@delon/abc/avatar-list';
import { EllipsisModule } from '@delon/abc/ellipsis';
import { FooterToolbarModule } from '@delon/abc/footer-toolbar';
import { TagSelectModule } from '@delon/abc/tag-select';
import { CurrencyPipeModule } from '@delon/util';
import { SharedModule } from '@shared';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { TripsComponent } from './trips/trips.component';
import { TripRoutingModule } from './trips-routing.module';
import { MapModule } from '../map/map.module';

@NgModule({
  declarations: [TripsComponent, TripDetailComponent],
  imports: [
    CommonModule,
    CommonModule,
    TripRoutingModule,
    SharedModule,
    EllipsisModule,
    TagSelectModule,
    AvatarListModule,
    FooterToolbarModule,
    NzPaginationModule,
    NzStepsModule,
    CurrencyPipeModule,
    MapModule,
    NzDescriptionsModule,
    NzBadgeModule
  ]
})
export class TripsModule {}
