import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global-service';
import { Withdrawalorder } from './payment.interface';
import { tap } from 'rxjs';
import { element } from 'protractor';

interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'nz-demo-table-row-selection-custom',
  styleUrls: ['./payment.component.less'],
  template: `
    <div class="document-container">
      <nz-card [nzBordered]="false">
        <button (click)="exportToExcel()">Export to Excel</button>
        <nz-table
          #rowSelectionTable
          nzShowSizeChanger
          [nzData]="withdrawalorder"
          (nzCurrentPageDataChange)="onCurrentPageDataChange($event)"
        >
          <thead>
            <tr>
              <th
                [nzSelections]="listOfSelection"
                [(nzChecked)]="checked"
                [nzIndeterminate]="indeterminate"
                (nzCheckedChange)="onAllChecked($event)"
              ></th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Monto</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let data of withdrawalorder">
              <td [nzChecked]="setOfCheckedId.has(data.pk)" (nzCheckedChange)="onItemChecked(data.pk, $event)"></td>
              <td>{{ data.user.first_name }} {{ data.user.last_name }}</td>
              <td>{{ data.user.email }}</td>
              <td>{{ data.amount }}</td>
              <td>{{ data.status }}</td>
            </tr>
          </tbody>
        </nz-table>
      </nz-card>
    </div>
  `
})
export class PaymentComponent implements OnInit {
  loading = false;
  withdrawalorder: Withdrawalorder[] = [];
  withdrawalorderToExport: Withdrawalorder[] = [];

  constructor(private service: GlobalService) {}

  ngOnInit(): void {
    this.getData();
  }

  protected getData() {
    this.service
      .getwithdrawalorder()
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.loading = false;
        this.withdrawalorder = res;
      });
  }

  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.withdrawalorder.forEach((data, index) => this.updateCheckedSet(data.pk, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.withdrawalorder.forEach((data, index) => this.updateCheckedSet(data.pk, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Withdrawalorder[] = [];
  listOfCurrentPageDataToexport: Withdrawalorder[] = [];
  listOfData: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
      const itemToExport = this.withdrawalorder.find(element => element.pk === id);

      if (itemToExport) {
        this.listOfCurrentPageDataToexport.push(itemToExport);
      }
    } else {
      this.setOfCheckedId.delete(id);
      this.listOfCurrentPageDataToexport = this.listOfCurrentPageDataToexport.filter(item => item.pk !== id);
    }
    console.log(this.listOfCurrentPageDataToexport);
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.withdrawalorder.forEach(item => this.updateCheckedSet(item.pk, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly Withdrawalorder[]): void {
    console.log($event);
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    console.log('d');

    this.checked = this.withdrawalorder.every(item => this.setOfCheckedId.has(item.pk));
    console.log(this.checked);
    this.indeterminate = this.withdrawalorder.some(item => this.setOfCheckedId.has(item.pk)) && !this.checked;
  }

  async exportToExcel(): Promise<void> {
    const { Workbook } = await import('exceljs');
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    worksheet.addRow([
      'Rut proveedor',
      'Nombre proveedor',
      'Banco Proveedor',
      'Cuenta Proveedor',
      'Tipo Documento',
      'Numero de Documento',
      'Monto',
      'Forma de pago',
      'cod suc',
      'email aviso',
      'Mensaje aviso'
    ]);

    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF00' }
    };

    this.listOfCurrentPageDataToexport.forEach(element => {
      worksheet.addRow([
        element.account_bank.id_legal,
        element.account_bank.full_name_account,
        element.account_bank.name_bank,
        element.account_bank.number_account,
        'HONORARIO',
        1,
        element.amount,
        'CTACTE SCOTIABANK',
        2
      ]);
    });

    worksheet.columns.forEach(column => {
      let maxWidth = 0;
      if (column && column.eachCell) {
        column.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
          const len = cell.text ? cell.text.toString().length : 0;
          if (len > maxWidth) {
            maxWidth = len;
          }
        });
        column.width = maxWidth < 20 ? 20 : maxWidth;
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
