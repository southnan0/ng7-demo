import {Observable} from "rxjs";
import {finalize, map, catchError} from "rxjs/operators";
import {NzMessageService} from "ng-zorro-antd";

export class CommonService {
    public loading = {};
    public urlPrefix = 'http://localhost:8089';

    constructor(private message:NzMessageService){}

    getData(http: Observable<any>,key): Observable<any>{
        this.loading[key] = this.loading[key]+1;
        return http.pipe(
          map(res=>{
            if(res && res.result){
              const code = res.result.code;
              if(code === 0){
                return res.result;
              }
            }
            if(res && res.result && res.result.code === 0){
              return res.result;
            }

            throw new Error(res.msg || "接口调用失败");
          }),
          finalize(() => {
            this.loading[key] = this.loading[key]-1;
          }),
          catchError((err) => {
            this.message.error(err);
            throw new Error(err);
          })
        )
      }
}
