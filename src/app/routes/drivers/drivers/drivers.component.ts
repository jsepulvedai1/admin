import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STChange, STComponent, STData, STColumn } from '@delon/abc/st';
import { G2MiniBarData } from '@delon/chart/mini-bar';
import { _HttpClient } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map, tap } from 'rxjs';

import { UserService } from '../../../services/users-service';
import { Data } from '../../users/users/users.component';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.less']
})
export class DriversComponent implements OnInit {
  listOfData: readonly Data[] = [];
  ps = 20;
  total = 200; // mock total
  args = { _allow_anonymous: true, userid: null };
  url = `https://api.randomuser.me/?results=20`;
  events: G2MiniBarData[] = [];
  scroll = { y: '230px' };
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
    { title: 'id', index: 'pk', width: 100 },
    {
      title: 'Nombre',
      index: 'first_name',
      width: 100
    },
    { title: 'Email', index: 'email', width: 100 },
    { title: 'Telefono', index: 'phone', width: 100 },
    {
      title: 'Actions',
      width: 120,
      buttons: [
        {
          text: 'Detalle',
          click: item => this.router.navigate([`/drivers/detail/${item.pk}`])
        }
      ]
    }
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
    private router: Router
  ) {
    this.token = JSON.parse(localStorage.getItem('userData') || '{}').token;
  }

  ngOnInit(): void {
    this.loading = true;
    this.getUserData();
  }

  protected getUserData() {
    this.userService
      .getDrivers()
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.data = res;
        this.dataOriginal = res;
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  protected getUserFilter() {
    const regex = /^\d+$/;
    let phone = '';
    let email = this.q.email;
    if (regex.test(this.q.email)) {
      phone = this.q.email;
      email = '';
    }
    phone = regex.test(this.q.email) ? this.q.email : '';
    this.userService
      .getDriversFilter(email, phone)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.data = res;
        this.dataOriginal = res;
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  createUser() {
    this.router.navigate([`/users/create`]);
  }

  stChange(e: STChange): void {
    switch (e.type) {
      case 'checkbox':
        this.selectedRows = e.checkbox!;
        this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv['callNo'], 0);
        this.cdr.detectChanges();
        break;
      case 'filter':
        this.getUserData();
        break;
    }
  }
  fullChange(val: boolean): void {
    this.scroll = val ? { y: '550px' } : { y: '430px' };
  }

  reset(): void {
    setTimeout(() => this.getUserData());
  }
}
