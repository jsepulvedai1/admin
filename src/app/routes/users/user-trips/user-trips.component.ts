import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LastTrip, UserData } from '../users-detail/user-detail-interface';

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
  constructor(private router: Router) {}
  @Input() userTrips: LastTrip[] = [];

  ngOnInit(): void {}
}
