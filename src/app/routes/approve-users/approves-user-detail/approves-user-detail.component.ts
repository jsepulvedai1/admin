import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/users-service';
import { DocumentEnum, userDetail } from './user-detail.interface';
import { ModalDetailUserComponent } from '../modal-detail-user/modal-detail-user.component';

@Component({
  selector: 'app-approves-user-detail',
  templateUrl: './approves-user-detail.component.html',
  styleUrls: ['./approves-user-detail.component.less']
})
export class ApprovesUserDetailComponent implements OnInit {
  userInfo: userDetail = {
    type_vehicle: 0,
    accept_trip_type_1: false,
    accept_trip_type_2: false,
    accept_trip_type_3: false,
    accept_trip_type_4: false
  };
  loading = true;
  pk: string = '';
  data: any = {};
  data2: any = {};
  radioValue = 'A';
  padron = 'A';
  licencia = 'A';
  selectedValues: { [key: string]: string } = {};
  TripEnum: { [key: string]: any } = {
    'Licencia Frontal': this.padron,
    'Licencia Posterior': 'A',
    'Padron Vehiculo': 'A'
  };

  typeVehicle = '';
  accept_trip_type_1 = false;
  accept_trip_type_2 = false;
  accept_trip_type_3 = false;
  accept_trip_type_4 = false;
  id_number = '';

  userName = '';

  selectedValue = '1';

  fallback = 'data:image/png;base64,...'; // Base64 string truncated for brevity

  DocumentEnum: DocumentEnum = {
    driver_license_front: 'Licencia Frontal',
    driver_license_back: 'Licencia Posterior',
    indenfitication_front: 'Identificacion Frontal',
    indenfitication_back: 'Identificaion Posterior',
    residence_certificate: 'Certificado de residencia',
    background_certificate: 'Papel de Antecedentes',
    circulation_permit_front: 'Permiso de Circulacion',
    technical_review: 'Revision Tecnica',
    photo_vehicle_1: 'Foto Vehiculo Frontal',
    photo_vehicle_2: 'Foto Vehiculo Trasero',
    padron: 'Padron Vehiculo',
    type_vehicle: 'Tipo de Vehiculo'
  };
  userInfoName = 'John Doe'; //

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private msg: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.pk = params.get('id')!;
    });
    this.getUserRecord();
    this.getUserDetail();
  }

  protected getUserDetail() {
    this.userService.getUserDetail(this.pk).subscribe(res => {
      this.userInfo = res;
      this.userName = this.userInfo.first_name + ' ' + this.userInfo.last_name;
      this.loading = false;
    });
  }

  protected getUserRecord() {
    this.userService
      .getUsersRecord(this.pk)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.data = res[0];
        this.selectedValue = this.data.type_vehicle.toString();
        this.buildData();
      });
  }

  documents = [
    { imageUrl: 'https://i.blogs.es/0ca9a6/aa/1366_2000.jpeg', description: 'Descripción de la imagen 1' },
    { imageUrl: 'https://i.blogs.es/0ca9a6/aa/1366_2000.jpeg', description: 'Descripción de la imagen 2' }
  ];

  buildData() {
    this.data2 = {
      driver_license_front: this.data.driver_license_front || this.fallback,
      driver_license_back: this.data.driver_license_back || this.fallback,
      indenfitication_front: this.data.indenfitication_front || this.fallback,
      residence_certificate: this.data.residence_certificate || this.fallback,
      background_certificate: this.data.background_certificate || this.fallback,
      circulation_permit_front: this.data.circulation_permit_front || this.fallback,
      technical_review: this.data?.technical_review || this.fallback,
      photo_vehicle_1: this.data?.photo_vehicle_1 || this.fallback,
      photo_vehicle_2: this.data?.photo_vehicle_2 || this.fallback,
      padron: this.data?.padron || this.fallback,
      type_vehicle: this.data?.type_vehicle || this.fallback
    };
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  openModal(document: any, key: string): void {
    const modalRef = this.modalService.create({
      nzContent: ModalDetailUserComponent,
      nzWidth: '60%'
    });

    const instance = modalRef.getContentComponent() as ModalDetailUserComponent;
    instance.userDetailModal = this.userInfo;
    instance.record = {
      image: document,
      details: this.userInfo,
      imageExpanded: false
    };
    instance.driverInfo = this.data;
    instance.keyName = key;
    instance.id_number = this.userInfo.id_number ?? '';
    instance.type_vehicle = this.data2.type_vehicle;

    modalRef.afterClose.subscribe(result => {
      this.selectedValues[key] = result.result.image;
      this.data2.type_vehicle = result.value;
      this.selectedValues['type_vehicle'] = result.value;
      this.userInfo.id_number = result.id_number;
    });
  }

  rejectUser() {
    console.log(this.selectedValues);
    this.userService
      .rejectUser(this.pk)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.msg.success('Usuario rechazado con éxito');
        this.router.navigate(['/approve-drivers/']);
      });
  }

  logicOfAuto() {
    if (this.typeVehicle === '1') {
      this.typeVehicle = '1';
      this.accept_trip_type_1 = true;
      this.accept_trip_type_2 = false;
      this.accept_trip_type_3 = false;
      this.accept_trip_type_4 = false;
    }
    if (this.typeVehicle === '2') {
      this.accept_trip_type_1 = true;
      this.accept_trip_type_2 = true;
      this.accept_trip_type_3 = false;
      this.accept_trip_type_4 = false;
    }
    if (this.typeVehicle === '3') {
      this.accept_trip_type_1 = true;
      this.accept_trip_type_2 = false;
      this.accept_trip_type_3 = true;
      this.accept_trip_type_4 = false;
    }
    if (this.typeVehicle === '4') {
      this.accept_trip_type_1 = true;
      this.accept_trip_type_2 = false;
      this.accept_trip_type_3 = false;
      this.accept_trip_type_4 = true;
    }
  }

  approveUser() {
    this.logicOfAuto();
    let validate = false;
    for (const k in this.data2) {
      if (!this.selectedValues[k]) {
        validate = true;
      }
    }
    if (validate) {
      this.msg.error('Documentos sin evaluar');
      return;
    }
    this.userInfo.is_validated = 1;
    this.userService
      .approveUserRecord(this.data.pk)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {});
    this.userService
      .approveUser(this.pk, this.userInfo)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.data = res[0];
        this.msg.success('Usuario aprobado con éxito');
        this.router.navigate(['/approve-drivers/']);
      });
    // this.userService
    //   .rejecDocument(
    //     this.data.pk,
    //     this.typeVehicle,
    //     this.accept_trip_type_1,
    //     this.accept_trip_type_2,
    //     this.accept_trip_type_3,
    //     this.accept_trip_type_4
    //   )
    //   .pipe(tap(() => (this.loading = false)))
    //   .subscribe(res => {
    //     this.msg.success('Usuario rechazado con éxito');
    //     console.log(res);
    //   });
  }
}
