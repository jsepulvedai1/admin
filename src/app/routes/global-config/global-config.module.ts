import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarListModule } from '@delon/abc/avatar-list';
import { EllipsisModule } from '@delon/abc/ellipsis';
import { FooterToolbarModule } from '@delon/abc/footer-toolbar';
import { TagSelectModule } from '@delon/abc/tag-select';
import { CurrencyPipeModule } from '@delon/util';
import { SharedModule } from '@shared';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { GlobalConfigComponent } from './global-config/global-config.component';
import { GlobalConfigRoutingModule } from './global-config-routing.module';
import { PanelComponent } from './panel/panel.component';
import { BasicFormComponent } from '../pro/form/basic-form/basic-form.component';

@NgModule({
  declarations: [GlobalConfigComponent, PanelComponent],
  imports: [
    CommonModule,
    GlobalConfigRoutingModule,
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
export class GlobalConfigModule {}
