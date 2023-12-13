import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import type { Chart } from '@antv/g2';
import { OnboardingService } from '@delon/abc/onboarding';
import { _HttpClient } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { AuthenticationService } from 'src/app/services/auth-service';
import { TripService } from 'src/app/services/trip-service';
import { UserService } from 'src/app/services/users-service';

import { CHARTS } from './info';

@Component({
  selector: 'app-dashboard-v1',
  templateUrl: './v1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardV1Component implements OnInit {
  webSite!: any[];
  salesData!: any[];
  offlineChartData!: any[];
  usersSize: Number = 0;
  tripSize: Number = 0;
  driverSize: Number = 0;

  constructor(
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private platform: Platform,
    private router: Router,
    private userService: UserService,
    private tripService: TripService,
    @Inject(DOCUMENT) private doc: NzSafeAny
  ) {}

  fixDark(chart: Chart): void {
    if (!this.platform.isBrowser || (this.doc.body as HTMLBodyElement).getAttribute('data-theme') !== 'dark') return;

    chart.theme({
      styleSheet: {
        backgroundColor: 'transparent'
      }
    });
  }

  ngOnInit(): void {
    this.getUsers();
    this.getTrips();
    this.getDrivers();
    this.webSite = CHARTS['/chart'].visitData.slice(0, 10);
    this.salesData = CHARTS['/chart'].salesData;
    this.offlineChartData = CHARTS['/chart'].offlineChartData;
  }

  private getUsers() {
    this.userService.getUsers().subscribe(res => {
      this.usersSize = res.length;
      this.cdr.detectChanges();
    });
  }
  private getDrivers() {
    this.userService.getDrivers().subscribe(res => {
      this.driverSize = res.length;
      this.cdr.detectChanges();
    });
  }

  private getTrips() {
    this.tripService.getTrips().subscribe(res => {
      this.tripSize = res.length;
      this.cdr.detectChanges();
    });
  }

  // private genOnboarding(): void {
  //   const KEY = 'on-boarding';
  //   if (!this.platform.isBrowser || localStorage.getItem(KEY) === '1') {
  //     return;
  //   }
  //   this.http.get(`./assets/tmp/on-boarding.json`).subscribe(res => {
  //     this.obSrv.start(res);
  //     localStorage.setItem(KEY, '1');
  //   });
  // }

  protected navigateToOtherPage() {
    this.router.navigate(['/users']);
  }

  protected navigateToOtherApproveUser() {
    this.router.navigate(['/approve-users']);
  }

  protected navigateToTrips() {
    this.router.navigate(['/trips']);
  }

  protected navigateToDrivers() {
    this.router.navigate(['/drivers']);
  }
}
