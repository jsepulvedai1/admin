import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STChange, STColumn, STComponent, STData } from '@delon/abc/st';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map, tap } from 'rxjs';
import { TripService } from 'src/app/services/trip-service';

import { UserService } from '../../../services/users-service';
import { GlobalService } from 'src/app/services/global-service';
import { NzColorPickerComponent } from 'ng-zorro-antd/color-picker';
import { NgAntdColorPickerModule } from 'ng-antd-color-picker';
import { CreateColorComponent } from '../create-color/create-color.component';
import { ModalDetailUserComponent } from '../../approve-users/modal-detail-user/modal-detail-user.component';

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
    { title: 'Codigo', index: 'code' },
    {
      title: 'Color',
      index: 'code'
    }
  ];
  selectedRows: STData[] = [];
  description = '';
  totalCallNo = 0;
  expandForm = false;
  hex: string = '#1677ff';

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private globalService: GlobalService,
    private router: Router,
    private tripService: TripService,
    private modal: NzModalService
  ) {
    this.token = JSON.parse(localStorage.getItem('userData') || '{}').token;
  }

  ngOnInit(): void {
    this.loading = true;
    this.getColors();
  }

  protected getColors() {
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

  protected getColorsFilter() {
    this.data = this.dataOriginal;
    if (this.q.email && this.q.email.trim() !== '') {
      const data1 = this.data.filter(item => item.user_customer.email.toLowerCase().includes(this.q.email.trim().toLowerCase()));
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
        this.getColors();
        break;
    }
  }
  reset(): void {
    // wait form reset updated finished
    setTimeout(() => this.getColors());
  }

  fullChange(val: boolean): void {
    this.scroll = val ? { y: '550px' } : { y: '430px' };
  }

  openCreate(record: { id?: number; type?: number } = {}): void {
    const modalInfo = 'Crear Banco';
    record.type = 2;
    //const modalRef2 = this.modal.create(CreateColorComponent);
    const modalRef = this.modal.create({
      nzContent: CreateColorComponent,
      nzFooter: null
    });

    // const modalRef = this.modal.create({});
    modalRef.afterClose.subscribe(result => {
      this.getColors();
    });
  }
}
