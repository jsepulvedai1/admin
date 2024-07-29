import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LastTrip, UserData } from '../users-detail/user-detail-interface';
import { UserService } from 'src/app/services/users-service';
import { tap } from 'rxjs';
import { EstadoViaje, EstadoViajeText, TipoViaje, FormaDePago } from '../../trips/trip-detail/trip-detail.enum';

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
  EstadoViaje = EstadoViaje;
  EstadoViajeText = EstadoViajeText;
  TipoViaje = TipoViaje;
  FormaDePago = FormaDePago;
  loading = true;
  constructor(
    private router: Router,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  @Input() userPk: string = '0';
  userTrips: any[] = [];
  trip: any;

  ngOnInit(): void {
    this.getTrips();
  }
  getTrips() {
    this.userService
      .getUsersTrips(this.userPk)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.userTrips = res;
        this.trip = res[0];
        console.log(this.userTrips);
        this.cdr.detectChanges();
      });
  }
}
