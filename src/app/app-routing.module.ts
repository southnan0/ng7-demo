import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {FinancialComponent} from './financial/financial.component';
import {FinancialDetailComponent} from './financial-detail/financial-detail.component';
import {CheckInModule} from './check-in/check-in.module';

const routes: Routes = [{
  path: 'financial',
  component: FinancialComponent
}, {
  path: 'financial-detail/:id',
  component: FinancialDetailComponent
}, {
  path: 'user',
  loadChildren: './user/user.module#UserModule'
}, {
  path: 'check-in',
  loadChildren: './check-in/check-in.module#CheckInModule'
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule {
}
