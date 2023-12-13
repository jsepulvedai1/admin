import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { tap } from 'rxjs';
import { UserService } from 'src/app/services/users-service';

import { DocumentEnum, userDetail } from './user-detail.interface';
import { ModalDetailUserComponent } from '../modal-detail-user/modal-detail-user.component';

@Component({
  selector: 'app-approves-user-detail',
  templateUrl: './approves-user-detail.component.html',
  styleUrls: ['./approves-user-detail.component.less']
})
export class ApprovesUserDetailComponent implements OnInit {
  userInfo: userDetail = {};
  loading = false;
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

  fallback =
    'data:image/png;base64,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';

  DocumentEnum: DocumentEnum = {
    driver_license_front: 'Licencia Frontal',
    driver_license_back: 'Licencia Posterior',
    indenfitication_front: 'Identificacion Frontal',
    indenfitication_back: 'Identificaion Posterior',
    residence_certificate: 'Certificado de residencia',
    background_certificate: 'background certificate',
    circulation_permit_front: 'Permiso de Circulacion',
    technical_review: 'Revision Tecnica',
    photo_vehicle_1: 'Foto vehiculo',
    photo_vehicle_2: 'Foto vehiculo2',
    padron: 'Padron Vehiculo'
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private modal: ModalHelper,
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
      console.log(res);
      this.userInfo = res;
    });
  }

  protected getUserRecord() {
    this.userService
      .getUsersRecord(this.pk)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        console.log(res);
        this.data = res[0];
        this.buildData();
      });
  }

  buildData() {
    console.log(this.data);
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
      padron: this.data?.padron || this.fallback
    };
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  openModal(document: any) {
    const record = {
      image: document,
      details: this.userInfo
    };
    const driverInfo = this.data;
    const userDetailModal = this.userInfo;
    this.modal.create(ModalDetailUserComponent, { userDetailModal, record, driverInfo }).subscribe(res => {});
  }

  rejectUser(userData: any) {
    console.log(this.selectedValues);
    this.userService
      .rejecDocument(this.data.pk, this.selectedValues)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        // console.log(res);
        // this.data = res[0];
        this.getUserRecord();
      });
  }

  approveUser() {
    let validate = false;
    console.log(this.selectedValues);
    for (const k in this.data2) {
      if (!this.selectedValues[k]) {
        console.log(this.selectedValues[k]);
        validate = true;
      }
    }
    if (validate) this.msg.error(`Documentos si evaluar`);
    this.userInfo.is_validated = 1;
    this.userInfo.antecedentes_back = '';
    this.userInfo.antecedentes_front = '';
    this.userService
      .approveUser(this.pk, this.userInfo)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        console.log(res);
        this.data = res[0];
        this.msg.success(`Usurario aprobado con exito`);
        this.router.navigate([`/approve-users/`]);
      });
  }
}
