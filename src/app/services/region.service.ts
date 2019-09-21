import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Resp} from "../entity/account";
import {Region} from "../entity/region";
import {CommonService} from "./common.service";
import {NzMessageService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class RegionService extends CommonService{

  private provinceListUrl = 'http://localhost:8089/region/provinceList';
  private regionListByIdUrl = 'http://localhost:8089/region/regionListById';

  constructor(private http: HttpClient,message:NzMessageService ) {
    super(message);
  }

  getProvinceList(): Observable<Resp<Region[]>> {
    return this.getData(this.http.get<Resp<Region[]>>(this.provinceListUrl),'getProvinceList');
  }

  getRegionListById(parentId: number): Observable<Resp<Region[]>> {
    return this.getData(this.http.get<Resp<Region[]>>(`${this.regionListByIdUrl}/${parentId}`),'getRegionListById');
  }
}
