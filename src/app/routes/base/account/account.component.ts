import { Component, OnInit } from '@angular/core';
import { Account } from '../../../entity/account';
import { Organize } from '../../../entity/organize';
import { AccountService } from '../../../services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizeService } from 'src/app/services/organize.service';
import { NzMessageService } from 'ng-zorro-antd';

import {accountStatusList} from '../../../config/statusList';

import _ from 'lodash';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.styl']
})
export class AccountComponent implements OnInit {
  accountList: Account[];
  roleSettingVisible: boolean = false;
  addAccountVisible: boolean = false;
  orgList: Organize[];
  validateForm: FormGroup;
  accountStatusList = accountStatusList;
  isEdit: boolean = false;

  constructor(
    public accountService: AccountService,
    private fb: FormBuilder,
    private organizeService: OrganizeService,
    private message: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      orgIds: ['', [Validators.required]],
      loginName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getOrgList();
    this.getAccountList();
  }

  getAccountList(): void {
    this.accountService.getAccountList()
      .subscribe(resp => this.accountList = resp.data);
  }

  getOrgList(): void {
    this.organizeService.getTreeOrgList()
      .subscribe(orgList => this.orgList = orgList);
  }

  handleCancel(type: string): void {
    this[type] = false;
    if(type === 'addAccountVisible'){
      this.reset();
    }
  }

  reset(): void{
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsPristine();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
  }

  handleOk(type: string): void {
    this[type] = false;
  }

  handleAddAccount(): void {
    const { value, controls } = this.validateForm;
    let errLength = 0;
    for (const key in controls) {
      if (controls[key].errors) {
        errLength++;
      }
      controls[key].markAsDirty();
      controls[key].updateValueAndValidity();
    }

    if (!errLength) {
      this.accountService.addAccount(value)
        .subscribe(resp => {
          if (resp.data) {
            this.message.create('success', '新增成功');
            this.addAccountVisible = false;
            this.getAccountList();
          }
        });
    }
  }

  showModal(type:string, account?: Account):void {
    if(type === 'roleSettingVisible'){
      //todo:
    }else{
      if(account){
        this.isEdit = true;
        this.validateForm.setValue(_.pick(account,[
          "orgIds",
          "loginName",
          "password",
          "userName",
          "mobile"]));
      }else{
        this.isEdit = false;
      }
    }

    this[type] = true;
  }

  handleDisableAccount(account: Account):void {
    this.accountService.disableAccount(account.accountId)
      .subscribe(resp => {
        if (resp.data) {
          this.message.create('success', '禁用成功');
          this.getAccountList();
        }
      });
  }

  handleEnableAccount(account: Account):void {
    this.accountService.enableAccount(account.accountId)
      .subscribe(resp => {
        if (resp.data) {
          this.message.create('success', '启用成功');
          this.getAccountList();
        }
      });
  }

  handleDeleteAccount(account: Account):void {
    this.accountService.deleteAccount(account.accountId)
      .subscribe(resp => {
        if (resp.data) {
          this.message.create('success', '删除成功');
          this.getAccountList();
        }
      });
  }
}
