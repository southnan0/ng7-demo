import {Component, OnInit} from '@angular/core';
import {Account} from '../../entity/account';
import {Organize} from '../../entity/organize';
import {AccountService} from '../../services/account.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(private accountService: AccountService, private fb: FormBuilder) {
    this.validateForm = this.fb.group( {
      orgId: ['', [Validators.required]],
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
      .subscribe(resp => this.accountList = resp.accountList);
  }

  getOrgList(): void {
    this.accountService.getOrgList()
      .subscribe(resp => this.orgList = resp.organizeList);
  }

  handleCancel(type: string): void {
    this[type] = false;
  }

  handleOk(type: string): void {
    this[type] = false;
  }

  handleModalShow(type: string): void {
    this[type] = true;
  }

  handleAddAccount() {
    console.info(this.validateForm.value);
  }
}
