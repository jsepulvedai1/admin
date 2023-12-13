import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { userDetail } from '../approves-user-detail/user-detail.interface';

@Component({
  selector: 'app-modal-detail-user',
  templateUrl: './modal-detail-user.component.html',
  styleUrls: ['./modal-detail-user.component.less']
})
export class ModalDetailUserComponent {
  isVisible = false;
  isConfirmLoading = false;
  data: any = {};
  userDetailModal: userDetail = {};
  driverInfo: any;
  record = {
    image: 'https://pbs.twimg.com/profile_images/1014662509045919750/Q8r2bozC_400x400.jpg',
    details: {}
  };
  isImageExpanded = false;
  imageCssClasses = {
    im: true, // Clase predeterminada para la imagen
    expanded: this.isImageExpanded // Clase que se aplicará cuando isImageExpanded sea true
  };

  radioValue: any;
  selectedValue: any;

  constructor() {}

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  toggleImageSize(): void {
    this.isImageExpanded = !this.isImageExpanded;
  }
}
