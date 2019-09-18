import {Component, OnInit} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from "../../../services/login.service";
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    const {value, controls} = this.validateForm;
    let errLength = 0;

    for (const i in controls) {
      if (controls[i].errors) {
        errLength++;
      }
      controls[i].markAsDirty();
      controls[i].updateValueAndValidity();
    }

    if (!errLength) {
      //todo:submit
      this.loginService.login(value)
        .subscribe({
          next:({data})=>{
              this.message.success('登录成功');
              Cookies.set('token', data);
              this.router.navigateByUrl("/base/account");
              // console.info(data)
              //todo: 页面跳转

          },
          error:(err)=>{
            this.message.error('用户名密码错误')
          }
        })
    }
  }

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private message: NzMessageService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      mobile: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
