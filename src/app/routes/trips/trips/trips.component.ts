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
  //listOfData: readonly Data[] = [];

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
    phone: string;
    sorter: string;
    status: number | null;
    statusList: NzSafeAny[];
  } = {
    pk: 1,
    ps: 10,
    email: '',
    phone: '',
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
      title: 'Telefono Pasajero',
      index: 'user_customer.phone'
    },
    {
      title: 'Telefono Conductor',
      index: 'user_delivery.phone'
    },
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
          item.user_delivery.email.includes(this.q.email.trim().toLowerCase()) ||
          item.user_customer.phone.toString().includes(this.q.email.trim().toLowerCase()) ||
          item.user_delivery.phone.toString().includes(this.q.email.trim().toLowerCase())
      );
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

  listOfData: DataItem[] = [
    {
      startDate: '03/04/2003',
      endDate: '31/12/2003',
      interestRate: '15.00%',
      accountType: 'Time deposit account',
      accountNumber: '2095 0001 00 0000000001',
      monthlyInterestRate: '1.25%',
      name: '',
      age: 0,
      address: ''
    },
    {
      startDate: '05/04/2003',
      endDate: '31/12/2003',
      interestRate: '3.20%',
      accountType: 'Automatic transfer service account',
      accountNumber: '2095 0001 00 0000000007',
      monthlyInterestRate: '0.28%',
      name: '',
      age: 0,
      address: ''
    },
    {
      startDate: '05/04/2003',
      endDate: '31/12/2003',
      interestRate: '2.10%',
      accountType: 'Numbered bank account',
      accountNumber: '2099 0001 00 0000000938',
      monthlyInterestRate: '0.18%',
      name: '',
      age: 0,
      address: ''
    },
    {
      startDate: '05/04/2003',
      endDate: '31/12/2003',
      interestRate: '2.30%',
      accountType: 'Personal account',
      accountNumber: '2095 0001 00 000125711',
      monthlyInterestRate: '0.18%',
      name: '',
      age: 0,
      address: ''
    },
    {
      startDate: '05/04/2003',
      endDate: '31/12/2003',
      interestRate: '3.83%',
      accountType: 'Negotiable Order of Withdrawal account',
      accountNumber: '2095 0001 00 001658111',
      monthlyInterestRate: '0.28%',
      name: '',
      age: 0,
      address: ''
    }
  ];
  filteredData: DataItem[] = [...this.listOfData];

  // listOfColumns: ColumnItem[] = [
  //   {
  //     name: 'Name',
  //     sortOrder: null,
  //     sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
  //     listOfFilter: [
  //       { text: 'Joe', value: 'Joe' },
  //       { text: 'Jim', value: 'Jim' }
  //     ],
  //     filterFn: (list: string[], item: DataItem) => list.some(name => item.name.indexOf(name) !== -1)
  //   },
  //   {
  //     name: 'Age',
  //     sortOrder: null,
  //     sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
  //     listOfFilter: [],
  //     filterFn: null
  //   },
  //   {
  //     name: 'Address',
  //     sortFn: null,
  //     sortOrder: null,
  //     listOfFilter: [
  //       { text: 'London', value: 'London' },
  //       { text: 'Sidney', value: 'Sidney' }
  //     ],
  //     filterFn: (address: string, item: DataItem) => item.address.indexOf(address) !== -1
  //   }
  // ];
  // listOfData: DataItem[] = [
  //   {
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park'
  //   },
  //   {
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park'
  //   },
  //   {
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park'
  //   },
  //   {
  //     name: 'Jim Red',
  //     age: 32,
  //     address: 'London No. 2 Lake Park'
  //   }
  // ];

  filterForm: FormGroup;
  // listOfData: DataItem[] = [
  //   {
  //     startDate: '03/04/2003',
  //     endDate: '31/12/2003',
  //     interestRate: '15.00%',
  //     accountType: 'Time deposit account',
  //     accountNumber: '2095 0001 00 0000000001',
  //     monthlyInterestRate: '1.25%'
  //   },
  //   {
  //     startDate: '05/04/2003',
  //     endDate: '31/12/2003',
  //     interestRate: '3.20%',
  //     accountType: 'Automatic transfer service account',
  //     accountNumber: '2095 0001 00 0000000007',
  //     monthlyInterestRate: '0.28%'
  //   },
  //   {
  //     startDate: '05/04/2003',
  //     endDate: '31/12/2003',
  //     interestRate: '2.10%',
  //     accountType: 'Numbered bank account',
  //     accountNumber: '2099 0001 00 0000000938',
  //     monthlyInterestRate: '0.18%'
  //   },
  //   {
  //     startDate: '05/04/2003',
  //     endDate: '31/12/2003',
  //     interestRate: '2.30%',
  //     accountType: 'Personal account',
  //     accountNumber: '2095 0001 00 000125711',
  //     monthlyInterestRate: '0.18%'
  //   },
  //   {
  //     startDate: '05/04/2003',
  //     endDate: '31/12/2003',
  //     interestRate: '3.83%',
  //     accountType: 'Negotiable Order of Withdrawal account',
  //     accountNumber: '2095 0001 00 001658111',
  //     monthlyInterestRate: '0.28%'
  //   }
  // ];
  //filteredData: DataItem[] = [...this.listOfData];

  constructor(
    private fb: FormBuilder,
    public msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private tripService: TripService
  ) {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      interestRate: [''],
      accountType: [''],
      accountNumber: [''],
      monthlyInterestRate: ['']
    });
    this.token = JSON.parse(localStorage.getItem('userData') || '{}').token;
  }
  // constructor(
  //   public msg: NzMessageService,
  //   private cdr: ChangeDetectorRef,
  //   private router: Router,
  //   private tripService: TripService
  // ) {
  //   this.token = JSON.parse(localStorage.getItem('userData') || '{}').token;
  // }

  applyFilters(): void {
    const { startDate, endDate, interestRate, accountType, accountNumber, monthlyInterestRate } = this.filterForm.value;

    this.filteredData = this.listOfData.filter(
      item =>
        (!startDate || item.startDate.includes(startDate)) &&
        (!endDate || item.endDate.includes(endDate)) &&
        (!interestRate || item.interestRate.includes(interestRate)) &&
        (!accountType || item.accountType.includes(accountType)) &&
        (!accountNumber || item.accountNumber.includes(accountNumber)) &&
        (!monthlyInterestRate || item.monthlyInterestRate.includes(monthlyInterestRate))
    );
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.filteredData = [...this.listOfData];
  }
}
