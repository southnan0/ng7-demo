import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountComponent} from './account/account.component';
import {BaseRoutingModule} from '../base-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OrganizeComponent } from './organize/organize.component';

@NgModule({
  imports: [
    CommonModule,
    BaseRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AccountComponent, OrganizeComponent]
})
export class BaseModule {
}
