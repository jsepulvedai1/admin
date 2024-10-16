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

import { CreateUserComponent } from './create-user/create-user.component';
import { UserDetailEditComponent } from './user-detail-edit/user-detail-edit.component';
import { UserGetgoComponent } from './user-getgo/user-getgo.component';
import { UserTripsComponent } from './user-trips/user-trips.component';
import { UsersComponent } from './users/users.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { UsersRoutingModule } from './users-routing.module';
import { GetgoBalanceComponent } from './getgo-balance/getgo-balance.component';
import { CommissionsComponent } from './commissions/commissions.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';

@NgModule({
  declarations: [
    UsersComponent,
    UsersDetailComponent,
    CreateUserComponent,
    UserDetailEditComponent,
    UserGetgoComponent,
    UserTripsComponent,
    GetgoBalanceComponent,
    CommissionsComponent,
    BankAccountsComponent
  ],
  imports: [
    CommonModule,
    NzSkeletonModule,
    NzEmptyModule,
    NzTimelineModule,
    UsersRoutingModule,
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
    NzTableModule
  ],
  exports: [UserTripsComponent, UserGetgoComponent, GetgoBalanceComponent, CommissionsComponent, BankAccountsComponent]
})
export class UsersModule {}
