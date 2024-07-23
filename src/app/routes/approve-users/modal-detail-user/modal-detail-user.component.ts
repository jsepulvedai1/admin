import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { userDetail } from '../approves-user-detail/user-detail.interface';
import { rutTools } from 'prettyutils';

@Component({
  selector: 'app-modal-detail-user',
  templateUrl: './modal-detail-user.component.html',
  styleUrls: ['./modal-detail-user.component.less']
})
export class ModalDetailUserComponent implements OnInit {
  @Input() userDetailModal: userDetail = {
    type_vehicle: 0,
    accept_trip_type_1: false,
    accept_trip_type_2: false,
    accept_trip_type_3: false,
    accept_trip_type_4: false
  };
  @Input() driverInfo: any;
  @Input() record: any;
  @Input() keyName: any;
  isConfirmLoading = false;
  selectedValue: null | undefined;
  @Input() id_number = '';
  @Input() type_vehicle = '1';
  isValidRut = false;

  img = '';

  constructor(private modal: NzModalRef) {}
  ngOnInit(): void {
    this.img = this.record.image ? this.record.image.replace(/^http:\/\//i, 'https://') : '';
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    this.modal.close({ result: this.record, radioValue: true, value: this.selectedValue, id_number: this.id_number });
    setTimeout(() => {
      this.isConfirmLoading = false;
      this.modal.close({ result: 'ok', radioValue: 'true', value: this.selectedValue });
    }, 3000);
  }

  handleCancel(): void {
    this.record.image = '';
    this.modal.close({ result: this.record, radioValue: true });
  }

  handleCancelOutside(): void {
    this.modal.close({ action: 'cancel' });
  }

  toggleImageSize(): void {
    this.record.imageExpanded = !this.record.imageExpanded;
  }

  validarRut2() {
    this.id_number = rutTools.format(this.id_number);
    if (this.id_number.length > 8) {
      if (!rutTools.validate(this.id_number)) {
        this.isValidRut = false;
      } else {
        this.isValidRut = true;
      }
    }
  }

  validarRut(rut: string): boolean {
    // Implementa aquí tu lógica de validación de RUT
    // Por simplicidad, este ejemplo solo verifica si el RUT tiene una longitud de 10 caracteres
    if (!rut) {
      return false;
    }
    const rutRegex = /^[0-9]+-[0-9kK]{1}$/; // Expresión regular básica para el RUT (ejemplo: 12345678-9 o 12345678-K)
    return rutRegex.test(rut);
  }
}
