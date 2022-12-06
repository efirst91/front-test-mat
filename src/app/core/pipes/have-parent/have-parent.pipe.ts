import {Pipe, PipeTransform} from '@angular/core';
import {Peripheral} from "../../interface/peripheral/peripheral-req";
import {Gateway} from "../../interface/gateway/gateway-req";

@Pipe({
  name: 'haveParent'
})
export class HaveParentPipe implements PipeTransform {

  transform(value: Peripheral | Gateway | null): boolean {
    const peripheral = value as Peripheral;
    return !!peripheral?.gatewayId;
  }

}
