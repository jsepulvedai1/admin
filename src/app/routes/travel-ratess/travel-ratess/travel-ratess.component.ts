import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError } from 'rxjs';
import { GlobalService } from 'src/app/services/global-service';

@Component({
  selector: 'app-travel-ratess',
  templateUrl: './travel-ratess.component.html',
  styleUrls: ['./travel-ratess.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TravelRatessComponent implements OnInit {
  isDisabled: boolean = true;
  panels = [
    { name: 'Taxi', active: true, form: this.createFormGroup() },
    { name: 'Car', active: false, form: this.createFormGroup() },
    { name: 'XL', active: false, form: this.createFormGroup() },
    { name: 'Ejecutivo', active: false, form: this.createFormGroup() }
  ];

  submitting = false;
  data: any;

  constructor(
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private globalService: GlobalService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getConfig();
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      type_rate: ['', Validators.required],
      type_trip: ['', Validators.required],
      value_km: ['', Validators.required],
      value_minute: ['', Validators.required],
      value_base: ['', Validators.required],
      value_cancel: ['', Validators.required],
      value_operational: ['', Validators.required]
    });
  }

  getConfig(): void {
    this.globalService.getTravelRates().subscribe(res => {
      this.setFormValues(res);
      this.data = res;
    });
  }

  setFormValues(data: any[]): void {
    data.forEach(tarifa => {
      let panelName;
      switch (tarifa.name) {
        case 'Taxi':
          panelName = 'Taxi';
          break;
        case 'Car':
          panelName = 'Car';
          break;
        case 'XL':
          panelName = 'XL';
          break;
        case 'Ejecutivo':
          panelName = 'Ejecutivo';
          break;
        default:
          return;
      }

      const panel = this.panels.find(p => p.name === panelName);
      if (panel) {
        panel.form.patchValue({
          name: tarifa.name,
          type_rate: tarifa.type_rate,
          value_km: tarifa.value_km,
          value_minute: tarifa.value_minute,
          value_base: tarifa.value_base,
          value_cancel: tarifa.value_cancel,
          value_operational: tarifa.value_operational,
          type_trip: tarifa.type_trip
        });
      }
    });
  }

  submit(form: FormGroup, panelName: string): void {
    this.submitting = true;
    const pk = this.data.find((info: { name: string }) => info.name == panelName).pk;
    console.log(form.value);
    this.globalService
      .updateTravelRates(pk, form.value)
      .pipe(
        catchError(error => {
          this.msg.error(`Error al actualizar los datos`);
          this.submitting = false;
          this.cdr.detectChanges();
          return ''; // Devuelve un observable vacío para completar la secuencia
        })
      )
      .subscribe(res => {
        if (res) {
          this.getConfig();
          this.msg.success('Datos actualizados con éxito');
        }
        this.submitting = false;
        this.cdr.detectChanges();
      });
    return;
  }
}
