import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { tap, Observable } from 'rxjs';
import { BankService } from 'src/app/services/bank-service';

import { ProBasicListEditComponent } from '../../pro/list/basic-list/edit/edit.component';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.less']
})
export class BanksComponent implements OnInit {
  q = {
    q: '',
    status: 'all'
  };
  loading = false;
  data: Array<{
    id: number;
    name: string;
    image?: string;
  }> = [];

  constructor(
    private msg: NzMessageService,
    private modal: ModalHelper,
    private cdr: ChangeDetectorRef,
    private bankService: BankService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.getBankInfo();
  }

  protected getBankInfo() {
    this.bankService
      .getBanks()
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.data = res;
        this.data.map(bank => {
          if (bank.name.includes('Estado')) {
            bank.image =
              'data:image/png;base64,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';
            return;
          }
          const expresionRegular = /bci/i;
          if (expresionRegular.test(bank.name)) {
            bank.image = 'https://pbs.twimg.com/profile_images/1014662509045919750/Q8r2bozC_400x400.jpg';
            return;
          }
          bank.image =
            'data:image/png;base64,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';
        });
        this.cdr.detectChanges();
      });
  }
  openEdit(item: any): void {
    const modalInfo = 'Editar Banco';
    const record = {
      Nombre: item.name,
      type: 1,
      pk: item.pk
    };
    this.modal.create(ProBasicListEditComponent, { record, modalInfo }, { size: 'md' }).subscribe(res => {
      this.getBankInfo();
      this.data.splice(0, 0, res);
      this.data = [...this.data];
      this.cdr.detectChanges();
    });
  }

  openCreate(record: { id?: number; type?: number } = {}): void {
    const modalInfo = 'Crear Banco';
    record.type = 2;
    this.modal.create(ProBasicListEditComponent, { record, modalInfo }, { size: 'md' }).subscribe(res => {
      if (record.id) {
        record = { ...record, id: 'mock_id', percent: 0, ...res };
      } else {
        this.data.splice(0, 0, res);
        this.data = [...this.data];
      }
      this.getBankInfo();
      this.cdr.detectChanges();
    });
  }

  remove(bank: any): void {
    this.bankService
      .deleteBank(bank.pk)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.getBankInfo();
      });
    this.msg.success(`banco ${bank.name} eliminado con exito`);
  }
}
