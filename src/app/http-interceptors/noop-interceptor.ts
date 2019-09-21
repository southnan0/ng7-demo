import {Injectable} from "@angular/core";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";

import {Observable} from "rxjs";
import {tap, catchError} from "rxjs/operators";
import {NzMessageService} from "ng-zorro-antd";
import Cookie from 'js-cookie';
import {Router} from "@angular/router";

@Injectable()
export class NoopInterceptor implements HttpInterceptor{
  constructor(private messeger: NzMessageService, private router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let ok: string;

    const newReq = req.clone({headers:req.headers.set('Authorization',Cookie.get('token') || '')});

    return next.handle(newReq).pipe(
      tap(
        event => {
          ok = event instanceof HttpResponse?'succeeded':'';
        },
        error =>{
          if(error.status === 401){
            setTimeout(() => location.replace(`/user/login?${encodeURIComponent(this.router.url)}`),3000);
            throw new Error('用户验证失败，请登录');
          }
          throw new Error('接口调用失败');
        }
      )
    );
  }
}
