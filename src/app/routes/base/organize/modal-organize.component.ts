import { Component,Input, forwardRef, ViewChild } from '@angular/core';
import {Organize} from "../../../entity/organize";
import {NzFormatEmitEvent} from 'ng-zorro-antd';
import {ControlValueAccessor, Validator, NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, ValidationErrors} from '@angular/forms';

/**
 * 遍历树形，把value翻译出对应的label
 * @param list
 * @param arrValue
 */
const getLabelDeepByValue = (list:any[],arrValue: any[]) => {
  let arr = [];
  list.forEach((item) => {
    if(arrValue.indexOf(item.orgId) !==-1){
      arr.push(item.orgName);
    }
    if(item.children && item.children.length){
      arr = arr.concat(getLabelDeepByValue(item.children,arrValue));
    }
  });
  return arr;
};

@Component({
  selector: 'app-modal-organize',
  templateUrl: './modal-organize.component.html',
  styleUrls: ['./modal-organize.component.styl'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ModalOrganizeComponent),
    multi: true
  },{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => ModalOrganizeComponent),
    multi: true
  }]
})
export class ModalOrganizeComponent implements ControlValueAccessor,Validator {
  @ViewChild('treeCom') treeCom;
  @Input() orgList: Organize[];
  @Input() defaultCheckedKeys: any[];

  value: string = '';
  label: string = '';
  private parseError: boolean;
  searchValue: string;
  modalVisible: boolean = false;

  private checkedList: Organize[]=[];

  public writeValue(value: string): void {
      this.value = value;
      this.label = this.getLabelByValue(value);
  }

  public registerOnChange(fn: any): void {
    this.handleChange = fn;
  }

  //todo: 这里怎么用
  public validate(control: AbstractControl): ValidationErrors | null {
    return (!this.parseError) ?null:{
      value:{
        valid:false
      }
    }
  }

  public registerOnTouched(fn: any): void {

  }

  public handleCheckBoxChange($event: NzFormatEmitEvent): void{
    this.checkedList = $event.checkedKeys.map((item) => item.origin);
  }

  public handleModalShow(): void{
    this.modalVisible = true;
  }

  public handleModalCancel(): void{
    this.modalVisible = false;
  }

  public handleModalOk(): void{
    this.value = this.getDeep(this.checkedList,'orgId');
    this.label = this.getDeep(this.checkedList,'orgName');
    this.handleChange(this.value);
    this.handleModalCancel();
  }

  private getDeep(list: Organize[], keyName:string): string{
    let arr = [];
    list.forEach((item) => {
      arr.push(item[keyName]);

      if(item.children && item.children.length){
        arr = arr.concat(this.getDeep(item.children, keyName))
      }
    });
    return arr.join(',');
  }

  private getLabelByValue(value:string): string{
    const arrLabel = getLabelDeepByValue(this.orgList, (value || '').split(','));

    return arrLabel.join(',');
  }

  private handleChange=(value:string)=>{}
}
