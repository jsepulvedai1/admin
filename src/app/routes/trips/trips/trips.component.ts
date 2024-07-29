import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STChange, STColumn, STComponent, STData } from '@delon/abc/st';
import { _HttpClient } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map, tap } from 'rxjs';
import { TripService } from 'src/app/services/trip-service';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/users-service';
import { Data } from '../../users/users/users.component';

interface DataItem {
  name: string;
  age: number;
  address: string;
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
}

filterForm: FormGroup;
export enum EstadoViaje {
  Borrador = 0,
  EsperandoConfirmacionConductor = 1,
  ConfirmacionConductor = 2,
  EnCaminoParaRecoger = 3,
  ViajeIniciado = 4,
  ViajeCanceladoPorConductor = 5,
  ViajeCanceladoPorUsuario = 6,
  ViajeCompletado = 7,
  EsperandoRespuestaDelConductor = 10
}

interface DataItem {
  startDate: string;
  endDate: string;
  interestRate: string;
  accountType: string;
  accountNumber: string;
  monthlyInterestRate: string;
}

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.less']
})
export class TripsComponent implements OnInit {
  listOfData: readonly Data[] = [];

  nameFilter: string = '';
  //filteredData: DataItem[] = [];

  listOfColumns: ColumnItem[] = [
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' }
      ],
      filterFn: (list: string[], item: DataItem) => list.some(name => item.name.indexOf(name) !== -1)
    },
    {
      name: 'Age',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Address',
      sortFn: null,
      sortOrder: null,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' }
      ],
      filterFn: (address: string, item: DataItem) => item.address.indexOf(address) !== -1
    }
  ];

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
    { title: 'Dirrecion Origen	', index: 'address_origin' },
    { title: 'Dirrecion Destino	', index: 'address_delivery' },
    {
      title: 'Pasajero',
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

  filteredData: any[] = [...this.data];

  constructor(
    public msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private tripService: TripService,
    private fb: FormBuilder
  ) {
    this.token = JSON.parse(localStorage.getItem('userData') || '{}').token;
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      address_origin: [''],
      address_delivery: [''],
      user_customer: [''],
      user_delivery: ['']
    });
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
        this.getTrips();
        break;
    }
  }

  reset(): void {
    setTimeout(() => this.getTrips());
  }

  fullChange(val: boolean): void {
    this.scroll = val ? { y: '550px' } : { y: '430px' };
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.filteredData = [...this.listOfData];
  }
  filterForm: FormGroup;
  applyFilters(): void {
    const { startDate, endDate, address_origin, address_delivery, user_customer, user_delivery } = this.filterForm.value;
  }

  tripDetail(pk: string): void {
    this.router.navigate([`/trips/detail/${pk}`]);
  }
}
