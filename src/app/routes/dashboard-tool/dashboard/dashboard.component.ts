import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalService } from 'src/app/services/global-service';
import { UserService } from 'src/app/services/users-service';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  validateForm: FormGroup = new FormGroup({});
  submitting = false;
  showPassword = false;
  constructor(
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private globalService: GlobalService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      code: ['', Validators.required],
      cantidad: ['', Validators.required],
      modo: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submit(): void {
    console.log('dasd..');
    console.log(this.validateForm.value);
    if (this.validateForm.valid) {
      const typeUser = this.validateForm.get('cantidad')?.value;
      const count = parseInt(typeUser, 10); // base 10
      const mode = this.validateForm.get('modo')?.value;
      const code = this.validateForm.get('code')?.value;
      // console.log('submit', this.validateForm.value);
      // this.userService.createUserTool(this.validateForm.value).subscribe(res => {
      //   this.msg.success(`Usurarios creado con exito`);
      //   this.cdr.detectChanges();
      // });
      // const typeUser = this.validateForm.get('sex')?.value;
      // const typeUserInt = parseInt(typeUser, 10); //
      // const typeUser = this.validateForm.get('sex')?.value;
      // const typeUserInt = parseInt(typeUser, 10); //
      this.userService.createBulkUser(count, mode, code);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
