import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalService } from 'src/app/services/global-service';
import { UserService } from 'src/app/services/users-service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.less']
})
export class CreateUserComponent implements OnInit {
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
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      type_user: ['', Validators.required],
      sex: ['', Validators.required],
      //user_name: ['', Validators.required],
      password: ['', Validators.required],
      parent_id: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3,}$/)]],
      selectValidate: ['Option 2'],
      phoneNumberPrefix: ['+86'],
      antecedentes_back: [''],
      antecedentes_front: ['']
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submit(): void {
    if (this.validateForm.valid) {
      const ageValue = this.validateForm.get('sex')?.value;
      const ageAsInt = parseInt(ageValue, 10); // base 10

      if (!isNaN(ageAsInt)) {
        this.validateForm.get('age')?.setValue(ageAsInt);
      } else {
      }
      const typeUser = this.validateForm.get('sex')?.value;
      const typeUserInt = parseInt(typeUser, 10); // base 10

      if (!isNaN(typeUserInt)) {
        this.validateForm.get('age')?.setValue(typeUserInt);
      } else {
        console.error('El valor ingresado no es un número válido.');
      }

      this.userService.createUser(this.validateForm.value).subscribe(res => {
        this.msg.success(`Usurario creado con exito`);
        this.router.navigate([`/users/`]);
        this.cdr.detectChanges();
      });
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
