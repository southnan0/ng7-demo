import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Resp} from "../entity/account";
import {Organize} from "../entity/organize";
import {HttpClient} from "@angular/common/http";
import {finalize, map} from "rxjs/operators";
import { CommonService } from './common.service';

import _ from 'lodash';
import {NzMessageService} from 'ng-zorro-antd';

const children = (list, parentId) => {
  const newList = _.remove(list, (item) => item.parentId === parentId);

  return newList.map((item) => {
    const c = children(list, item.orgId);  // 有损操作
    return ({
      ...item,
      children:c,
      title: item.orgName,
      key: item.orgId,
      isLeaf: !(c.length)
    })
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrganizeService extends CommonService{

  private organizeListUrl = 'http://localhost:8089/organize/organizeList';
  private addOrganizeUrl = 'http://localhost:8089/organize/addOrganize';
  private editOrganizeUrl = 'http://localhost:8089/organize/editOrganize';
  private disableOrganizeUrl = 'http://localhost:8089/organize/disableOrganize';
  private enableOrganizeUrl = 'http://localhost:8089/organize/enableOrganize';
  private getOrganizeByIdUrl = 'http://localhost:8089/organize/organize';

  constructor(private http:HttpClient, message:NzMessageService){
    super(message);
  }

  getOrgList(): Observable<Resp<Organize[]>> {
    return this.getData(this.http.get<Resp<Organize[]>>(this.organizeListUrl), 'getOrgList');
  }

  getTreeOrgList(): Observable<Organize[]> {
    return this.getOrgList().pipe(
      map((resp) => {
        let organizeList = resp.data;
        let orgList = _.remove(organizeList, (item) => item.parentId === 0);

        orgList = orgList.map((item) => {
          return {...item, children: children(organizeList, item.orgId), title: item.orgName, key: item.orgId}
        });
        return orgList;
      })
    );
  }

  addOrganize(organize: Organize): Observable<Resp<any>> {
    return this.getData(this.http.post<Resp<any>>(this.addOrganizeUrl, organize), 'addOrganize');
  }

  editOrganize(orgId:number, organize: Organize): Observable<Resp<any>> {
    return this.getData(this.http.post<Resp<any>>(`${this.editOrganizeUrl}/${orgId}`, organize), 'editOrganize');
  }

  disableOrganize(orgId: number): Observable<Resp<any>> {
    return this.getData(this.http.put<Resp<any>>(`${this.disableOrganizeUrl}/${orgId}`,{}), 'disableOrganize');
  }

  enableOrganize(orgId: number): Observable<Resp<any>> {
    return this.getData(this.http.put<Resp<any>>(`${this.enableOrganizeUrl}/${orgId}`,{}), 'enableOrganize');
  }

  organize(orgId: number): Observable<Resp<Organize>> {
    return this.getData(this.http.get<Resp<Organize>>(`${this.getOrganizeByIdUrl}/${orgId}`), 'organize');
  }
}
