import { Component, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { userDetail } from '../approves-user-detail/user-detail.interface';

@Component({
  selector: 'app-modal-detail-user',
  templateUrl: './modal-detail-user.component.html',
  styleUrls: ['./modal-detail-user.component.less']
})
export class ModalDetailUserComponent {
  @Input() userDetailModal: userDetail = {};
  @Input() driverInfo: any;
  @Input() record: any;
  isConfirmLoading = false;

  constructor(private modal: NzModalRef) {}

  handleOk(): void {
    this.isConfirmLoading = true;
    this.modal.close({ result: this.record, radioValue: true });
    setTimeout(() => {
      this.isConfirmLoading = false;
      this.modal.close({ result: 'ok', radioValue: 'true' });
    }, 3000);
  }

  handleCancel(): void {
    console.log('cancel');
    this.record.image = '';
    this.modal.close({ result: this.record, radioValue: true });
  }

  handleCancelOutside(): void {
    this.modal.close({ action: 'cancel' });
  }

  toggleImageSize(): void {
    this.record.imageExpanded = !this.record.imageExpanded;
  }
}
