import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaymentComponent } from './payment/payment.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  declarations: [PaymentComponent],
  imports: [CommonModule, PaymentRoutingModule, NzTableModule, NzCardModule]
})
export class PaymentModule {}
