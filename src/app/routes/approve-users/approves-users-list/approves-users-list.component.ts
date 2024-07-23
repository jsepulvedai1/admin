import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Data, Router } from '@angular/router';
import { STComponent, STColumn, STData, STChange } from '@delon/abc/st';
import { G2MiniBarData } from '@delon/chart/mini-bar';
import { _HttpClient } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { tap } from 'rxjs';
import { UserService } from 'src/app/services/users-service';

@Component({
  selector: 'app-approves-users-list',
  templateUrl: './approves-users-list.component.html',
  styleUrls: ['./approves-users-list.component.less']
})
export class ApprovesUsersListComponent implements OnInit {
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
  data2: any[] = [];
  data3: any[] = [];
  data4: any[] = [];
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
          click: item => this.router.navigate([`/approve-drivers/detail/${item.pk}`])
        }
      ]
    }
  ];
  selectedRows: STData[] = [];
  description = '';
  totalCallNo = 0;
  expandForm = false;

  constructor(
    public msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private router: Router
  ) {
    this.token = JSON.parse(localStorage.getItem('userData') || '{}').token;
  }

  ngOnInit(): void {
    this.loading = true;
    this.getUserToApprove();
    //this.getUserToApproveCancel();
  }

  protected getUserToApprove() {
    this.userService
      .getDriverToApproveBulk()
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.data2 = res;
        this.loading = false;
        this.unificarRespuestas();
        this.cdr.detectChanges();
      });
  }

  protected getUserToApproveCancel() {
    this.userService
      .getUsersToApproveCancel()
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.data3 = res;
        this.unificarRespuestas();
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  stChange(e: STChange): void {
    switch (e.type) {
      case 'checkbox':
        this.selectedRows = e.checkbox!;
        this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv['callNo'], 0);
        this.cdr.detectChanges();
        break;
      case 'filter':
        this.getUserToApprove();
        break;
    }
  }
  fullChange(val: boolean): void {
    this.scroll = val ? { y: '550px' } : { y: '430px' };
  }

  unificarRespuestas() {
    this.data = [...this.data2, ...this.data3];
  }

  reset(): void {
    setTimeout(() => this.getUserToApprove());
  }

  protected getTripsFilter() {
    this.data4 = this.data;
    if (this.q.email && this.q.email.trim() !== '') {
      const data1 = this.data.filter(
        item =>
          item.email.includes(this.q.email.trim().toLowerCase()) ||
          item.email.includes(this.q.email.trim().toLowerCase()) ||
          item.phone.toString().includes(this.q.email.trim().toLowerCase()) ||
          item.phone.toString().includes(this.q.email.trim().toLowerCase())
      );
      this.data = [...data1];
    } else {
    }
  }
}
