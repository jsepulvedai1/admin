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
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { ApproveWomanComponent } from './approve-woman/approve-woman.component';
import { ApproveWomanUserRoutingModule } from './approve-woman-routing.module';
import { ApprovesUserWomanDetailComponent } from './approves-user-woman-detail/approves-user-woman-detail.component';
import { ModalDetailUserWomanComponent } from './modal-detail-user/modal-detail-user.component';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzDemoImageBasicComponent } from './approves-user-woman-detail/imgage';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@NgModule({
  declarations: [ApproveWomanComponent, ApprovesUserWomanDetailComponent, ModalDetailUserWomanComponent, NzDemoImageBasicComponent],
  imports: [
    CommonModule,
    EllipsisModule,
    TagSelectModule,
    AvatarListModule,
    FooterToolbarModule,
    NzPaginationModule,
    NzStepsModule,
    CurrencyPipeModule,
    G2MiniBarModule,
    FullContentModule,
    SharedModule,
    ApproveWomanUserRoutingModule,
    NzImageModule,
    NzCarouselModule,
    NzSkeletonModule
  ]
})
export class ApproveWomanModule {}
