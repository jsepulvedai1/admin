import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorsComponent } from './colors/colors.component';
import { ColorsRoutingModule } from './colors-routing.module';
import { AvatarListModule } from '@delon/abc/avatar-list';
import { EllipsisModule } from '@delon/abc/ellipsis';
import { FooterToolbarModule } from '@delon/abc/footer-toolbar';
import { TagSelectModule } from '@delon/abc/tag-select';
import { CurrencyPipeModule } from '@delon/util';
import { SharedModule } from '@shared';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { MapModule } from '../map/map.module';
import { TripRoutingModule } from '../trips/trips-routing.module';
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';

@NgModule({
  declarations: [ColorsComponent],
  imports: [
    CommonModule,
    ColorsRoutingModule,
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
    NzBadgeModule,
    NzRateModule,
    NzColorPickerModule
  ]
})
export class ColorsModule {}
