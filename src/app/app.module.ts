import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { FinancialComponent } from './routes/financial/financial.component';
import { AppRoutingModule } from './app-routing.module';
import { FinancialDetailComponent } from './routes/financial-detail/financial-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MoneyPipe } from './pipes/money.pipe';

import {CznMenuModule} from './components/czn-menu/czn-menu.module';
import {httpInterceptorProviders} from "./http-interceptors";

import {DefaultComponent} from "./layouts/default/default.component";
import { FullComponent } from './layouts/full/full.component';

@NgModule({
  declarations: [
    AppComponent,
    FinancialComponent,
    FinancialDetailComponent,
    MoneyPipe,
    DefaultComponent,
    FullComponent,
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
  providers: [ { provide: NZ_I18N, useValue: zh_CN }, httpInterceptorProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
