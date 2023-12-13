import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalService } from 'src/app/services/global-service';

@Component({
  selector: 'app-global-config',
  templateUrl: './global-config.component.html',
  styleUrls: ['./global-config.component.less']
})
export class GlobalConfigComponent implements OnInit {
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
    g10_percentage_bono: new FormControl('', Validators.required)
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
      active: true,
      name: 'Configuraciones Globales',
      childPanel: [
        {
          active: false,
          name: 'This is panel header 1-1'
        }
      ]
    },
    {
      active: false,
      name: 'Configuraciones G0'
    },
    {
      active: false,
      name: 'Configuraciones G1'
    },
    {
      active: false,
      name: 'Configuraciones G2'
    },
    {
      active: false,
      name: 'Configuraciones G3'
    },
    {
      active: false,
      name: 'Configuraciones G4'
    },
    {
      active: false,
      name: 'Configuraciones G5'
    },
    {
      active: false,
      name: 'Configuraciones G6'
    },
    {
      active: false,
      name: 'Configuraciones G7'
    },
    {
      active: false,
      name: 'Configuraciones G8'
    },
    {
      active: false,
      name: 'Configuraciones G9'
    },
    {
      active: false,
      name: 'Configuraciones G10'
    }
  ];

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
        g10_percentage_bono: res[0].g10_percentage_bono
      });
      this.cdr.detectChanges();
    });
  }

  submit(): void {
    console.log(this.form);
    if (this.form.valid) {
      this.submitting = true;
      this.globalService.UpdateGlobalConfig(this.form.value).subscribe(res => {
        this.getConfig();
        this.cdr.detectChanges();
      });
      setTimeout(() => {
        this.submitting = false;
        this.msg.success(`datos actualizados con exito`);
        this.cdr.detectChanges();
      }, 1000);
      return;
    } else {
      this.msg.success(`error al actualizar datos `);
    }
  }
}
