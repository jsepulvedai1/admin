import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Data, Router } from '@angular/router';
import { STComponent, STColumn, STData, STChange } from '@delon/abc/st';
import { G2MiniBarData } from '@delon/chart/mini-bar';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { range, tap } from 'rxjs';
import { UserService } from 'src/app/services/users-service';

@Component({
  selector: 'app-approve-woman',
  templateUrl: './approve-woman.component.html',
  styleUrls: ['./approve-woman.component.less']
})
export class ApproveWomanComponent implements OnInit {
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
          click: item => this.router.navigate([`/approve-woman/detail/${item.pk}`])
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
    this.getUserToApprove2();
    this.unificarRespuestas();
  }

  protected getUserToApprove() {
    this.userService
      .getWomanUsers()
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.data2 = res;
        this.loading = false;
        this.cdr.detectChanges();
        this.unificarRespuestas();
      });
  }

  protected getUserToApprove2() {
    this.userService
      .getWomanUsersCanceled()
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        for (const item of res) {
          this.data.push(item);
        }

        this.loading = false;
        console.log(this.data);
        this.data3 = res;
        this.cdr.detectChanges();
        this.unificarRespuestas();
      });
  }

  unificarRespuestas() {
    // Unir los datos de ambos servicios en this.data
    this.data = [...this.data2, ...this.data3];
    console.log(this.data);
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
    setTimeout(() => this.getUserToApprove());
  }
}
