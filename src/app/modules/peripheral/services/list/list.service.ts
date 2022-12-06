import {Injectable, Injector} from '@angular/core';
import {GenericApiBase} from "../../../../core/services/generic-api-service";

@Injectable({
  providedIn: 'root'
})
export class ListPeripheralService extends GenericApiBase {
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  override URL_BASE = 'peripheral/';
}
