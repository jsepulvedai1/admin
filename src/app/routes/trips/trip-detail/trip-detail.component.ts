import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { Subscription } from 'rxjs';
import { TripService } from 'src/app/services/trip-service';
import { UserService } from 'src/app/services/users-service';

import { UserData } from '../../users/users-detail/user-detail-interface';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.less']
})
export class TripDetailComponent implements OnInit {
  pk: string = '';
  token: string;
  Sexo = {
    Hombre: 1,
    Mujer: 2
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private tripService: TripService,
    private route: ActivatedRoute
  ) {
    this.token = JSON.parse(localStorage.getItem('userData') || '{}').token;
    this.tripDetail = {};
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.pk = params.get('id')!;
    });
  }
  private router$!: Subscription;
  public user: any;
  public tripDetail: any;
  @ViewChild('tagInput', { static: false }) private tagInput!: ElementRef<HTMLInputElement>;
  //user: any;
  notice: any;
  tabs = [
    {
      key: 'articles',
      tab: 'Viajes'
    },
    {
      key: 'editar',
      tab: 'editar'
    }
  ];
  pos = 0;
  taging = false;
  tagValue = '';

  ngOnInit(): void {
    this.getTripDetail();
  }

  to(item: { key: string }): void {
    //this.router.navigateByUrl(`/pro/account/center/${item.key}`);
  }

  protected getTripDetail() {
    this.tripService.getTripDetail(this.pk).subscribe(res => {
      console.log(res);
      this.tripDetail = res;
      this.cdr.detectChanges();
    });
  }
}

// import { Component } from '@angular/core';

// @Component({
//   //   selector: 'app-trip-detail',
//   //   templateUrl: './trip-detail.component.html',
//   //   styleUrls: ['./trip-detail.component.less']
//   // })
// export class TripDetailComponent {}
