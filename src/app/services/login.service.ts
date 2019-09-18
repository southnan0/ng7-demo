import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonService} from "./common.service";
import {Observable} from 'rxjs';
import {Account, Resp} from "../entity/account";
import {NzMessageService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends CommonService{
  private loginUrl = `${this.urlPrefix}/account/login` ;

  constructor(private http: HttpClient,message:NzMessageService) {
    super(message);
  }

  login(account:Account): Observable<Resp<any>>{
    return this.getData(this.http.post<Resp<Account>>(this.loginUrl, account),'login');
  }
}
