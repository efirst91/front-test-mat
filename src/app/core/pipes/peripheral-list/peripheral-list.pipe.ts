import {Pipe, PipeTransform} from '@angular/core';
import {Peripheral} from "../../interface/peripheral/peripheral-req";

@Pipe({
  name: 'peripheralList'
})
export class PeripheralListPipe implements PipeTransform {

  /**
   * Return peripheral values
   * @param value
   */
  transform(value: Peripheral[]): string {
    let result = '';
    if (value?.length > 0) {
      result = value.length + '';
    }
    return result;
  }

}
