import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { GlobalService } from 'src/app/services/global-service';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'nz-demo-color-picker-use',
  styleUrls: ['./create-color.component.less'],
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSpan]="4">name</nz-form-label>
        <nz-form-control [nzSpan]="16">
          <input nz-input formControlName="userName" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSpan]="4">color</nz-form-label>
        <nz-form-control [nzSpan]="16">
          <nz-color-picker formControlName="colorPicker" nzShowText></nz-color-picker>
        </nz-form-control>
      </nz-form-item>
      <div class="botton">
        <nz-form-item>
          <nz-form-control>
            <button nz-button nzType="primary">Crear</button>
          </nz-form-control>
        </nz-form-item>
      </div>
    </form>
  `
})
export class CreateColorComponent {
  validateForm = this.formBuilder.group({
    userName: ['', [Validators.required]],
    colorPicker: ['#1677ff']
  });

  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private modal: NzModalRef
  ) {}

  submitForm(): void {
    const color = {
      name: this.validateForm.value.userName,
      code: this.validateForm.value.colorPicker
    };
    this.globalService
      .createColorsConfig(color)
      .pipe(tap(() => (this.loading = false)))
      .subscribe(res => {
        this.loading = false;
      });
    this.modal.close();
  }
}
