import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LastTrip, UserData } from '../users-detail/user-detail-interface';
import { UserService } from 'src/app/services/users-service';
import { tap } from 'rxjs';

interface Travel {
  id: number;
  destination: string;
  startDate: string;
  endDate: string;
  description: string;
  initTrip: string;
}
@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.less']
})
export class UserTripsComponent implements OnInit {
  loading = true;
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  @Input() userPk: string = '0';
  userTrips: LastTrip[] = [];

  ngOnInit(): void {
    this.getTrips();
  }
  getTrips() {
    this.userService
      .getUsersTrips(this.userPk)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.userTrips = res;
      });
  }
}
