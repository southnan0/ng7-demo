import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountComponent} from './base/account/account.component';
import {OrganizeComponent} from './base/organize/organize.component';
import {RouterModule} from '@angular/router';

const routes = [{
  path: 'account',
  component: AccountComponent
},{
  path: 'organize',
  component: OrganizeComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class BaseRoutingModule {
}
