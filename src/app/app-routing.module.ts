import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {FinancialComponent} from './routes/financial/financial.component';
import {FinancialDetailComponent} from './routes/financial-detail/financial-detail.component';

const routes: Routes = [{
  path: 'financial',
  component: FinancialComponent
}, {
  path: 'financial-detail/:id',
  component: FinancialDetailComponent
}, {
  path: 'user',
  loadChildren: './routes/user/user.module#UserModule'
}, {
  path: 'check-in',
  loadChildren: './routes/check-in/check-in.module#CheckInModule'
}, {
  path: 'base',
  loadChildren: './routes/base/base.module#BaseModule'
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
