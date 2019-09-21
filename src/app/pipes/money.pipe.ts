import {Pipe, PipeTransform} from '@angular/core';
import {div} from '../../utils/number.js';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? div(value, 100) : value;
  }

}
