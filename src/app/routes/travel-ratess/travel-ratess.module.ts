import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarListModule } from '@delon/abc/avatar-list';
import { EllipsisModule } from '@delon/abc/ellipsis';
import { FooterToolbarModule } from '@delon/abc/footer-toolbar';
import { TagSelectModule } from '@delon/abc/tag-select';
import { CurrencyPipeModule } from '@delon/util';
import { SharedModule } from '@shared';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { GlobalConfigRoutingModule } from '../global-config/global-config-routing.module';
import { TravelRatessgRoutingModule } from './traver-ratess-routing.module';
import { TravelRatessComponent } from './travel-ratess/travel-ratess.component';

@NgModule({
  declarations: [TravelRatessComponent],
  imports: [
    CommonModule,
    TravelRatessgRoutingModule,
    SharedModule,
    EllipsisModule,
    TagSelectModule,
    AvatarListModule,
    FooterToolbarModule,
    NzPaginationModule,
    NzStepsModule,
    CurrencyPipeModule,
    NzCollapseModule
  ]
})
export class TravelRatessModule {}
