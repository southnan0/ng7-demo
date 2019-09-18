import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';
import {Status} from "../entity/status";

@Pipe({
  name: 'transformStatus'
})
export class TransformStatusPipe implements PipeTransform {

  transform(value: any, statusList: Array<Status>): any {
    return value ? _.find(statusList,(item) => item.value === value).label || '': '';
  }

}
