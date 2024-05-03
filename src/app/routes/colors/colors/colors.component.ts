import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STChange, STColumn, STComponent, STData } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map, tap } from 'rxjs';
import { TripService } from 'src/app/services/trip-service';

import { UserService } from '../../../services/users-service';
import { GlobalService } from 'src/app/services/global-service';

export interface Data {
  id: number;
  email: string;
  phone: number;
  address: string;
  disabled: boolean;
}

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.less']
})
export class ColorsComponent implements OnInit {
  listOfData: readonly Data[] = [];
  scroll = { y: '220px' };
  token: string;
  q: {
    pk: number;
    ps: number;
    email: string;
    sorter: string;
    status: number | null;
    statusList: NzSafeAny[];
  } = {
    pk: 1,
    ps: 10,
    email: '',
    sorter: '',
    status: null,
    statusList: []
  };
  data: any[] = [];
  dataOriginal: any[] = [];
  loading = false;
  status = [
    { index: 0, text: '关闭', value: false, type: 'default', checked: false },
    {
      index: 1,
      text: '运行中',
      value: false,
      type: 'processing',
      checked: false
    },
    { index: 2, text: '已上线', value: false, type: 'success', checked: false },
    { index: 3, text: '异常', value: false, type: 'error', checked: false }
  ];
  @ViewChild('st', { static: true })
  st!: STComponent;
  columns: STColumn[] = [
    // { title: '', index: 'key', type: 'checkbox' },
    { title: 'Nombre', index: 'name' },
    { title: 'Codigo', index: 'code' }
    //{
    //   title: 'Color',
    //   render: 'customColor'
    // }
  ];
  selectedRows: STData[] = [];
  description = '';
  totalCallNo = 0;
  expandForm = false;

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private globalService: GlobalService,
    private router: Router,
    private tripService: TripService
  ) {
    this.token = JSON.parse(localStorage.getItem('userData') || '{}').token;
  }

  ngOnInit(): void {
    this.loading = true;
    this.getTrips();
  }

  protected getTrips() {
    this.globalService
      .getColorsConfig()
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.loading = false;
        this.data = res;
        this.dataOriginal = res;

        this.cdr.detectChanges();
      });
  }

  // customColor(data: any) {
  //   return `<div class="format"><nz-color-picker nzFormat="hex" [(ngModel)]="hex"></nz-color-picker> HEX: {{ hex }}</div>`;
  // }

  protected getTripsFilter() {
    this.data = this.dataOriginal;
    if (this.q.email && this.q.email.trim() !== '') {
      console.log(this.q);
      console.log(this.data);
      const data1 = this.data.filter(item => item.user_customer.email.toLowerCase().includes(this.q.email.trim().toLowerCase()));
      // const data2 = this.data.map(user => {
      //   console.log(user.user_customer.email);
      // });
      // console.log(this.data);
      // console.log(data1);
      this.data = [...data1];
    } else {
    }
  }
  stChange(e: STChange): void {
    switch (e.type) {
      case 'checkbox':
        this.selectedRows = e.checkbox!;
        this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv['callNo'], 0);
        this.cdr.detectChanges();
        break;
      case 'filter':
        this.getTrips();
        break;
    }
  }
  reset(): void {
    // wait form reset updated finished
    setTimeout(() => this.getTrips());
  }

  fullChange(val: boolean): void {
    this.scroll = val ? { y: '550px' } : { y: '430px' };
  }
}
