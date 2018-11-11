import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginComponent} from './user/login/login.component';
import {RouterModule} from '@angular/router';

const routes = [{
  path: 'login',
  component: LoginComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class UserRoutingModule {
}
