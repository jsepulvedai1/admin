import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaymentComponent } from './payment/payment.component';
import { PaymentRoutingModule } from './payment-routing.module';
@NgModule({
  declarations: [PaymentComponent],
  imports: [CommonModule, PaymentRoutingModule]
})
export class PaymentModule {}
