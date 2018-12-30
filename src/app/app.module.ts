import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { FinancialComponent } from './financial/financial.component';
import { AppRoutingModule } from './app-routing.module';
import { FinancialDetailComponent } from './financial-detail/financial-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MoneyPipe } from './money.pipe';

import {CznMenuModule} from './czn-menu/czn-menu.module';

@NgModule({
  declarations: [
    AppComponent,
    FinancialComponent,
    FinancialDetailComponent,
    MoneyPipe,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    NgZorroAntdModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CznMenuModule
  ],
  providers: [ { provide: NZ_I18N, useValue: zh_CN } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
