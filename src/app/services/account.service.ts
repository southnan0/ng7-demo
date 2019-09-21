import { Injectable } from '@angular/core';
import {Account, Resp} from '../entity/account';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { CommonService } from './common.service';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends CommonService{

  private accountListUrl = 'http://localhost:8089/account/accountList';
  private addAccountUrl = 'http://localhost:8089/account/addAccount';
  private updateAccountUrl = 'http://localhost:8089/account/updateAccount';
  private deleteAccountUrl = 'http://localhost:8089/account/deleteAccount';
  private disableAccountUrl = 'http://localhost:8089/account/disableAccount';
  private enableAccountUrl = 'http://localhost:8089/account/enableAccount';

  public loading = {
    getAccountList:0,
    addAccount:0,
    updateAccount:0,
    deleteAccount:0,
    disableAccount:0,
    enableAccount:0
  };


  constructor(private http: HttpClient,message:NzMessageService) {
    super(message);
   }

  getAccountList(): Observable<Resp<Account[]>> {
    return this.getData(this.http.get<Resp<Account[]>>(this.accountListUrl),'getAccountList');
  }

  addAccount(account: Account): Observable<Resp<any>> {
    return this.getData(this.http.post<Resp<any>>(this.addAccountUrl, account),'addAccount');
  }

  updateAccount(accountId:number, account: Account): Observable<Resp<any>> {
    return this.getData(this.http.put<Resp<any>>(`${this.updateAccountUrl}/${accountId}`,account),'updateAccount');
  }

  deleteAccount(accountId:number): Observable<Resp<any>> {
    return this.getData(this.http.delete<Resp<any>>(`${this.deleteAccountUrl}/${accountId}`),'deleteAccount');
  }

  disableAccount(accountId:number): Observable<Resp<any>> {
    return this.getData(this.http.put<Resp<any>>(`${this.disableAccountUrl}/${accountId}`,{}),'disableAccount');
  }

  enableAccount(accountId:number): Observable<Resp<any>> {
    return this.getData(this.http.put<Resp<any>>(`${this.enableAccountUrl}/${accountId}`,{}),'enableAccount');
  }
}
