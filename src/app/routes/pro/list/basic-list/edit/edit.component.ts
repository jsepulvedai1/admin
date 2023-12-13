import { Component } from '@angular/core';
import { SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { tap } from 'rxjs';
import { BankService } from 'src/app/services/bank-service';

@Component({
  selector: 'app-basic-list-edit',
  templateUrl: './edit.component.html'
})
export class ProBasicListEditComponent {
  record: any = {};
  modalInfo: string = 'Banco';
  schema: SFSchema = {
    properties: {
      Nombre: { type: 'string', name: 'Nombre', maxLength: 50 },
      Description: {
        type: 'string',
        title: 'descripcion',
        ui: {
          widget: 'textarea',
          autosize: { minRows: 2, maxRows: 6 }
        }
      }
    },
    required: ['nombre'],
    ui: {
      spanLabelFixed: 150,
      grid: { span: 24 }
    }
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    private bankService: BankService
  ) {}

  save(value: any): void {
    console.log(this.record);
    this.msgSrv.success('Banco Guardado con exito');
    console.log(value);
    const bankInfo = {
      name: value.Nombre
    };
    console.log(bankInfo);
    if (value.type == 1) {
      const d = this.bankService.updateBank(bankInfo, this.record.pk).subscribe(res => {
        console.log(res);
      });
      this.modal.close(value);
      return;
    }
    const d = this.bankService.createBank(bankInfo).subscribe(res => {
      console.log(res);
    });
    this.modal.close(value);
  }

  close(): void {
    this.modal.destroy();
  }
}
