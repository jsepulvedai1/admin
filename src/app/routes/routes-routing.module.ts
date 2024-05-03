import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { startPageGuard } from '@core';
import { authSimpleCanActivate, authSimpleCanActivateChild } from '@delon/auth';
import { PreloadOptionalModules } from '@delon/theme';
import { environment } from '@env/environment';

// layout
import { LayoutBasicComponent } from '../layout/basic/basic.component';
import { LayoutBlankComponent } from '../layout/blank/blank.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [startPageGuard, authSimpleCanActivate],
    canActivateChild: [authSimpleCanActivateChild],
    data: {},
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
      { path: 'drivers', loadChildren: () => import('./drivers/drivers.module').then(m => m.DriversModule) },
      { path: 'approve-drivers', loadChildren: () => import('./approve-users/approve-users.module').then(m => m.ApproveUsersModule) },
      { path: 'trips', loadChildren: () => import('./trips/trips.module').then(m => m.TripsModule) },
      { path: 'banks', loadChildren: () => import('./banks/banks.module').then(m => m.BanksModule) },
      { path: 'global-config', loadChildren: () => import('./global-config/global-config.module').then(m => m.GlobalConfigModule) },
      { path: 'pay-commission', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },
      { path: 'pro', loadChildren: () => import('./pro/pro.module').then(m => m.ProModule) },
      { path: 'approve-woman', loadChildren: () => import('./approve-woman/approve-woman.module').then(m => m.ApproveWomanModule) },
      { path: 'colors', loadChildren: () => import('./colors/colors.module').then(m => m.ColorsModule) }
    ]
  },
  // {
  //   path: 'data-v',
  //   component: LayoutBlankComponent,
  //   children: [{ path: '', loadChildren: () => import('./data-v/data-v.module').then(m => m.DataVModule) }]
  // },
  // // passport
  { path: '', loadChildren: () => import('./passport/passport.module').then(m => m.PassportModule), data: { preload: true } },
  { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
  { path: '**', redirectTo: 'exception/404' }
];

@NgModule({
  providers: [PreloadOptionalModules],
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
      preloadingStrategy: PreloadOptionalModules
    })
  ],
  exports: [RouterModule]
})
export class RouteRoutingModule {}
