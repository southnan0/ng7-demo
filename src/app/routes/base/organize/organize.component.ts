import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Organize} from "../../../entity/organize";
import {OrganizeService} from "../../../services/organize.service";
import {RegionService} from "../../../services/region.service";
import {Region} from "../../../entity/region";
import {NzFormatEmitEvent, NzMessageService} from "ng-zorro-antd";
import {orgStatusList} from '../../../config/statusList'

import _ from 'lodash';
import {Status} from "../../../entity/status";
import orgTypeList from "../../../config/orgTypeList";

@Component({
  selector: 'app-organize',
  templateUrl: './organize.component.html',
  styleUrls: ['./organize.component.styl']
})
export class OrganizeComponent implements OnInit {
  addOrganizeVisible: boolean = false;
  validateForm: FormGroup;
  orgList: Organize[];
  orgTypeList: Status[] = orgTypeList;
  regionList: Region[];
  selectedNote: Organize;
  isEdit: boolean = false;
  orgStatusList: Status[] = orgStatusList;

  constructor(
    private fb: FormBuilder,
    public organizeService: OrganizeService,
    private regionService: RegionService,
    private message: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      orgType: ['', [Validators.required]],
      parentId: ['', [Validators.required]],
      regionPathId: [[], [Validators.required]],
      orgName: ['', [Validators.required, Validators.maxLength(40)]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      longitude: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      memo: ['', [Validators.maxLength(100)]],
    });
  }

  ngOnInit() {
    this.getOrgList();
  }

  getOrgList(): void {
    this.organizeService.getTreeOrgList()
      .subscribe(orgList => {
        this.orgList = orgList
      });
  }

  getRegionList(): PromiseLike<any> {
    return new Promise((resolve) => {
      this.regionService.getProvinceList()
        .subscribe(resp => {
          this.regionList = resp.data;
          resolve();
        });
    });
  }

  //todo: return promise
  getRegionListById(parentId: number, node: Region, index: number): PromiseLike<any> {
    return new Promise((resolve, reject) => {
      this.regionService.getRegionListById(parentId)
        .subscribe(resp => {
          let regionList = resp.data;
          if (index === 2) {
            regionList = regionList.map(item => ({...item, isLeaf: true}))
          }
          node.children = regionList;
          resolve();
        });
    })
  }

  getOrgById(orgId: number){
    this.selectedNote = null;
    this.organizeService.organize(orgId)
      .subscribe(resp=>{
        this.selectedNote = resp.data;
      })
  }

  public getNextLevel(node: Region, index: number): PromiseLike<any> {
    if (index === -1) {
      return this.getRegionList();
    } else {
      return this.getRegionListById(node.regionId, node, index);
    }
  }

  handleCancel(type: string): void {
    this[type] = false;
    this.reset();
  }

  reset():void{
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsPristine();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }
  }

  handleAddOrganize() {
    const {value, controls} = this.validateForm;
    let errLength = 0;
    for (const key in controls) {
      if (controls[key].errors) {
        errLength++;
      }
      controls[key].markAsDirty();
      controls[key].updateValueAndValidity();
    }

    if (!errLength) {
      const params = _.omit({...value, regionId: value.regionPathId[value.regionPathId.length - 1]}, 'regionPathId');
      if(this.isEdit){
        return this.organizeService.editOrganize(this.selectedNote.orgId,params)
          .subscribe(resp => {
            if (resp.data) {
              this.message.create('success', '修改成功');
              this.addOrganizeVisible = false;
            }
          });
      }
      this.organizeService.addOrganize(params)
        .subscribe(resp => {
          if (resp.data) {
            this.message.create('success', '新增成功');
            this.addOrganizeVisible = false;
          }
        });
    }
  }

  selectOrganize($event: NzFormatEmitEvent){
    this.getOrgById($event.node.origin.orgId);
  }

  confirm(selectedNote: Organize): void{
      this.organizeService[selectedNote.status === 1?'disableOrganize':'enableOrganize'](selectedNote.orgId)
        .subscribe(resp=>{
          if(resp.data){
            this.message.create('success', '操作成功');
            this.getOrgById(selectedNote.orgId);
          }
        })
  }

  showModal(selectedNote?: Organize): void{
    if(selectedNote){
      this.isEdit = true;
      this.validateForm.setValue(_.pick(selectedNote,[
        "orgType",
        "parentId",
        "regionPathId",
        "orgName",
        "address",
        "longitude",
        "latitude",
        "memo"
      ]))
    }else{
      this.isEdit = false;
    }
    this.addOrganizeVisible = true;
  }


}
