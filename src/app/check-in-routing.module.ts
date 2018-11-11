import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderFormComponent} from './check-in/order-form/order-form.component';
import {RouterModule} from '@angular/router';

const routes = [{
  path: 'order-form',
  component: OrderFormComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class CheckInRoutingModule {
}
