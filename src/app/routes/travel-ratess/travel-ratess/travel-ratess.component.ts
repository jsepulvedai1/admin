import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError } from 'rxjs';
import { GlobalService } from 'src/app/services/global-service';

@Component({
  selector: 'app-travel-ratess',
  templateUrl: './travel-ratess.component.html',
  styleUrl: './travel-ratess.component.less'
})
export class TravelRatessComponent implements OnInit {
  form = new FormGroup({
    point_lower_limit: new FormControl('', Validators.required),
    point_high_limit: new FormControl('', Validators.required),
    cycle_limit: new FormControl('', Validators.required),
    g0_ref_min: new FormControl('', Validators.required),
    g0_ref_tree: new FormControl('', Validators.required),
    g0_percentage_bono: new FormControl('', Validators.required),
    g1_ref_min: new FormControl('', Validators.required),
    g1_ref_tree: new FormControl('', Validators.required),
    g1_percentage_bono: new FormControl('', Validators.required),
    g2_ref_min: new FormControl('', Validators.required),
    g2_ref_tree: new FormControl('', Validators.required),
    g2_percentage_bono: new FormControl('', Validators.required),
    g3_ref_min: new FormControl('', Validators.required),
    g3_ref_tree: new FormControl('', Validators.required),
    g3_percentage_bono: new FormControl('', Validators.required),
    g4_ref_min: new FormControl('', Validators.required),
    g4_ref_tree: new FormControl('', Validators.required),
    g4_percentage_bono: new FormControl('', Validators.required),
    g5_ref_min: new FormControl('', Validators.required),
    g5_ref_tree: new FormControl('', Validators.required),
    g5_percentage_bono: new FormControl('', Validators.required),
    g6_ref_min: new FormControl('', Validators.required),
    g6_ref_tree: new FormControl('', Validators.required),
    g6_percentage_bono: new FormControl('', Validators.required),
    g7_ref_min: new FormControl('', Validators.required),
    g7_ref_tree: new FormControl('', Validators.required),
    g7_percentage_bono: new FormControl('', Validators.required),
    g8_ref_min: new FormControl('', Validators.required),
    g8_ref_tree: new FormControl('', Validators.required),
    g8_percentage_bono: new FormControl('', Validators.required),
    g9_ref_min: new FormControl('', Validators.required),
    g9_ref_tree: new FormControl('', Validators.required),
    g9_percentage_bono: new FormControl('', Validators.required),
    g10_ref_min: new FormControl('', Validators.required),
    g10_ref_tree: new FormControl('', Validators.required),
    g10_percentage_bono: new FormControl('', Validators.required),
    limit_activate_driver_nearby: new FormControl('', Validators.required),
    cost_activation: new FormControl('', Validators.required),
    amount_for_activation: new FormControl('', Validators.required),
    cost_cancel_comision: new FormControl('', Validators.required),
    cost_operacional_cancel: new FormControl('', Validators.required),
    count_trip_driver_activation: new FormControl('', Validators.required),
    factor_point_activation: new FormControl('', Validators.required),
    factor_point_cancel_trip: new FormControl('', Validators.required),
    factor_point_trip: new FormControl('', Validators.required),
    tax_comision: new FormControl('', Validators.required),
    tax_transfer_bank: new FormControl('', Validators.required),
    factor_autocancel_trip: new FormControl('', Validators.required),
    radar_limit_trip_queue: new FormControl('', Validators.required)
  });
  submitting = false;

  constructor(
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.getConfig();
  }

  panels = [
    {
      active: false,
      name: 'Taxi'
    },
    {
      active: false,
      name: 'XL'
    },
    {
      active: false,
      name: 'Ejecutivo'
    },
    {
      active: false,
      name: 'Car'
    }
  ];

  getConfigApp() {}

  getConfig() {
    this.globalService.getGlobalConfig().subscribe(res => {
      this.form.patchValue({
        point_lower_limit: res[0].point_lower_limit,
        point_high_limit: res[0].point_high_limit,
        cycle_limit: res[0].cycle_limit,
        g0_ref_min: res[0].g0_ref_min,
        g0_ref_tree: res[0].g0_ref_tree,
        g0_percentage_bono: res[0].g0_percentage_bono,
        g1_ref_min: res[0].g1_ref_min,
        g1_ref_tree: res[0].g1_ref_tree,
        g1_percentage_bono: res[0].g1_percentage_bono,
        g2_ref_min: res[0].g2_ref_min,
        g2_ref_tree: res[0].g2_ref_tree,
        g2_percentage_bono: res[0].g2_percentage_bono,
        g3_ref_min: res[0].g3_ref_min,
        g3_ref_tree: res[0].g3_ref_tree,
        g3_percentage_bono: res[0].g3_percentage_bono,
        g4_ref_min: res[0].g4_ref_min,
        g4_ref_tree: res[0].g4_ref_tree,
        g4_percentage_bono: res[0].g4_percentage_bono,
        g5_ref_min: res[0].g5_ref_min,
        g5_ref_tree: res[0].g5_ref_tree,
        g5_percentage_bono: res[0].g5_percentage_bono,
        g6_ref_min: res[0].g6_ref_min,
        g6_ref_tree: res[0].g6_ref_tree,
        g6_percentage_bono: res[0].g6_percentage_bono,
        g7_ref_min: res[0].g7_ref_min,
        g7_ref_tree: res[0].g7_ref_tree,
        g7_percentage_bono: res[0].g7_percentage_bono,
        g8_ref_min: res[0].g8_ref_min,
        g8_ref_tree: res[0].g8_ref_tree,
        g8_percentage_bono: res[0].g8_percentage_bono,
        g9_ref_min: res[0].g9_ref_min,
        g9_ref_tree: res[0].g9_ref_tree,
        g9_percentage_bono: res[0].g9_percentage_bono,
        g10_ref_min: res[0].g10_ref_min,
        g10_ref_tree: res[0].g10_ref_tree,
        g10_percentage_bono: res[0].g10_percentage_bono,
        limit_activate_driver_nearby: res[0].limit_activate_driver_nearby,
        cost_activation: res[0].cost_activation,
        cost_cancel_comision: res[0].cost_cancel_comision,
        cost_operacional_cancel: res[0].cost_operacional_cancel,
        amount_for_activation: res[0].amount_for_activation,
        count_trip_driver_activation: res[0].count_trip_driver_activation,
        factor_point_activation: res[0].factor_point_activation,
        factor_point_cancel_trip: res[0].factor_point_cancel_trip,
        factor_point_trip: res[0].factor_point_trip,
        tax_comision: res[0].tax_comision,
        tax_transfer_bank: res[0].tax_transfer_bank,
        factor_autocancel_trip: res[0].factor_autocancel_trip
      });
      this.cdr.detectChanges();
    });
  }

  getGlobalApp() {
    this.globalService.getGlobalApp().subscribe(res => {
      this.form.patchValue({
        radar_limit_trip_queue: res[0].radar_limit_trip_queue
      });
      this.cdr.detectChanges();
    });
  }

  submit(): void {
    this.submitting = true;
    this.globalService
      .UpdateGlobalConfig(this.form.value)
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
    // setTimeout(() => {
    //   this.submitting = false;
    //   this.msg.success(`datos actualizados con exito`);
    //   this.cdr.detectChanges();
    // }, 1000);
    return;
  }
}
