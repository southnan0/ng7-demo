import { Injectable } from '@angular/core';
import {Account, Resp} from '../entity/account';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Organize} from '../entity/organize';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountListUrl = 'http://localhost:8089/account/accountList';
  private organizeListUrl = 'http://localhost:8089/organize/organizeList';

  constructor(private http: HttpClient) { }

  getAccountList(): Observable<Resp<Account[]>> {
    return this.http.get<Resp<Account[]>>(this.accountListUrl);
  }

  getOrgList(): Observable<Resp<Organize[]>> {
    return this.http.get<Resp<Organize[]>>(this.organizeListUrl);
  }
}
