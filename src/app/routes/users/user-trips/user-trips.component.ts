import { Component, Input, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

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
  @Input() userTrips: LastTrip[] = [];

  ngOnInit(): void {
    console.log(this.userTrips);
  }

  // buildInfo(): void {
  //   for (trip in this.userTrips) {
  //     this.tripsData.push;
  //   }
  // }
}
