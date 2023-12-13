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

export interface Data {
  id: number;
  email: string;
  phone: number;
  address: string;
  disabled: boolean;
}

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.less']
})
export class TripsComponent implements OnInit {
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
    { title: 'Id', index: 'pk' },
    { title: 'Ciudad', index: 'ciudad' },
    {
      title: 'Comuna',
      index: 'comuna'
    },
    {
      title: 'pasajero',
      index: 'user_customer.email'
    },
    {
      title: 'Conductor',
      index: 'user_delivery.email'
    },
    {
      title: 'Detalle',
      buttons: [
        {
          text: 'Detalle',
          click: item => this.router.navigate([`/trips/detail/${item.pk}`])
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
    this.tripService
      .getTrips()
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.loading = false;
        this.data = res;
        this.dataOriginal = res;

        this.cdr.detectChanges();
      });
  }

  protected getTripsFilter() {
    this.data = this.dataOriginal;
    if (this.q.email && this.q.email.trim() !== '') {
      const data1 = this.data.filter(
        item =>
          item.user_customer.email.includes(this.q.email.trim().toLowerCase()) ||
          item.user_delivery.email.includes(this.q.email.trim().toLowerCase())
      );
      ///const data2 = this.data.filter(item => item.user_delivery.email.includes(this.q.email.trim().toLowerCase()));
      this.data = [...data1];
    } else {
    }
  }

  // protected getUserData() {
  //   this.userService
  //     .getUsers(this.token)
  //     .pipe(tap(() => (this.loading = false)))
  //     .subscribe(res => {
  //       console.log(res);
  //       this.data = res;
  //       this.cdr.detectChanges();
  //     });
  // }

  // getData(): void {
  //   this.loading = true;
  //   //this.q.statusList = this.status.filter(w => w.checked).map(item => item.);
  //   if (this.q.status !== null && this.q.status > -1) {
  //     this.q.statusList.push(this.q.status);
  //   }
  //   this.http
  //     .get('/rule', this.q)
  //     .pipe(
  //       map((list: Array<{ status: number; statusText: string; statusType: string }>) =>
  //         list.map(i => {
  //           const statusItem = this.status[i.status];
  //           i.statusText = statusItem.text;
  //           i.statusType = statusItem.type;
  //           return i;
  //         })
  //       ),
  //       tap(() => (this.loading = false))
  //     )
  //     .subscribe(res => {
  //       console.log(res);
  //       //this.data = res;
  //       this.cdr.detectChanges();
  //     });
  // }

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

  // remove(): void {
  //   this.http.delete('/rule', { nos: this.selectedRows.map(i => i['no']).join(',') }).subscribe(() => {
  //     this.getData();
  //     this.st.clearCheck();
  //   });
  // }

  // approval(): void {
  //   this.msg.success(`审批了 ${this.selectedRows.length} 笔`);
  // }

  // add(tpl: TemplateRef<{}>): void {
  //   this.modalSrv.create({
  //     nzTitle: '新建规则',
  //     nzContent: tpl,
  //     nzOnOk: () => {
  //       this.loading = true;
  //       this.http.post('/rule', { description: this.description }).subscribe(() => this.getData());
  //     }
  //   });
  // }

  reset(): void {
    // wait form reset updated finished
    setTimeout(() => this.getTrips());
  }

  fullChange(val: boolean): void {
    this.scroll = val ? { y: '550px' } : { y: '430px' };
  }
}
