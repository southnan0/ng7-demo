import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInRoutingModule } from './check-in-routing.module';
import { OrderFormComponent } from './order-form/order-form.component';

@NgModule({
  imports: [
    CommonModule,
    CheckInRoutingModule,
  ],
  declarations: [OrderFormComponent]
})
export class CheckInModule { }
