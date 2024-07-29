import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { tap } from 'rxjs';
import { UserService } from 'src/app/services/users-service';

import { DocumentEnum, userDetail } from './user-detail.interface';
import { ModalDetailUserWomanComponent } from '../modal-detail-user/modal-detail-user.component';
import { validateRut } from '@fdograph/rut-utilities';
import { formatRut, RutFormat } from '@fdograph/rut-utilities';
import { rutTools } from 'prettyutils';
import { NzDemoImageBasicComponent } from './imgage';

@Component({
  selector: 'approve-user-woman-detail',
  templateUrl: './approves-user-woman-detail.component.html',
  styleUrls: ['./approves-user-detail.component.less']
})
export class ApprovesUserWomanDetailComponent implements OnInit {
  userInfo: userDetail = {};
  age: any;
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

  selectedValue = '1001';

  isValidRut = false;
  isValidStatus = false;

  effect = 'scrollx';

  array: string[] = [];

  fallback =
    'data:image/png;base64,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';

  DocumentEnum: DocumentEnum = {
    driver_license_front: 'Documento mujer',
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
  placeholder =
    'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

  rut: string = '';
  isValid: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private modal: ModalHelper,
    private msg: NzMessageService,
    private router: Router,
    private http: HttpClient
  ) {}
  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.pk = params.get('id')!;
    });
    //this.getUserRecord();
    await this.getUserDetail();
    this.buildData();
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  onImageError(event: Event): void {
    console.error('Image failed to load:', event);
  }

  protected async getUserDetail() {
    this.userService.getUserDetail(this.pk).subscribe(res => {
      this.userInfo = res;
      this.calculateAge(res.fec_birth);
      this.data2 = {
        driver_license_front: this.userInfo.document_sex_validator,
        id_photo: this.userInfo.id_photo
      };
      this.selectedValue = this.userInfo.is_validated_user?.toString() || '0';
      this.isValidStatus = this.userInfo.is_validated_user === '0' ? true : false;
      this.validarRut(this.userInfo.id_number || '');
      this.userInfo.avatar = this.userInfo?.avatar ? this.userInfo?.avatar.replace(/^http:\/\//i, 'https://') : '';
      this.userInfo.id_photo = this.userInfo?.id_photo ? this.userInfo?.id_photo.replace(/^http:\/\//i, 'https://') : '';
      const photho1 = this.userInfo.id_photo
        ? this.userInfo.id_photo.length > 2
          ? this.userInfo.id_photo
          : this.placeholder
        : this.placeholder;
      const photho2 = this.userInfo.avatar ? (this.userInfo.avatar.length > 2 ? this.userInfo.avatar : this.placeholder) : this.placeholder;
      this.array.push(photho1);
      this.array.push(photho2);
    });
  }

  async getBase64ImageFromUrl(imageUrl: any): Promise<any> {
    var res = await fetch(imageUrl);
    var blob = await res.blob();
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          resolve(reader.result);
        },
        false
      );

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }

  buildData() {
    this.data2 = {
      driver_license_front: this.userInfo.document_sex_validator,
      id_photo: this.userInfo.id_photo,
      avatar: this.userInfo.avatar
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
    this.modal.create(ModalDetailUserWomanComponent, { userDetailModal, record, driverInfo }).subscribe(res => {});
  }

  async rejectUser() {
    this.userService
      .rejectUserWoman(this.pk)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.data = res[0];
        this.msg.success(`Usurario rechazado con exito`);
        this.router.navigate([`/approve-woman/`]);
      });
  }

  async approveUser() {
    if (!this.userInfo.id_number || this.userInfo.id_number === '') {
      this.msg.error(`Se debe ingresar un rut`);
      return;
    }
    this.userInfo.is_validated_user = Number(this.selectedValue);
    this.userService
      .approveUserWoman(this.pk, this.userInfo)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.data = res[0];

        this.msg.success(`Usurario aprobado con exito`);
        this.router.navigate([`/approve-woman/`]);
      });
  }

  validarRut2() {
    this.userInfo.id_number = rutTools.format(this.userInfo.id_number);
    if (this.userInfo.id_number.length > 8) {
      if (!rutTools.validate(this.userInfo.id_number)) {
        this.isValidRut = false;
      } else {
        this.isValidRut = true;
      }
    }
  }
  validarRut(rut: string) {
    if (rut) {
      this.userInfo.id_number = rutTools.format(this.userInfo.id_number);
      if (this.userInfo.id_number.length > 8) {
        if (!rutTools.validate(this.userInfo.id_number)) {
          this.isValidRut = false;
        } else {
          this.isValidRut = true;
        }
      }
    }
  }

  calculateAge(birthdate: string): void {
    const birthDate = new Date(birthdate);
    const today = new Date();
    console.log(!!birthdate);
    if (!!birthdate == false) {
      this.age = 'Sin Informacion';
      console.log(this.age);
      return;
    }
    console.log('ddd');
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    console.log(age);
    this.age = age ?? 'Sin Informacion';
  }
}
