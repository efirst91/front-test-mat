import {Injectable, Injector} from '@angular/core';
import {GenericApiBase} from "../../../../core/services/generic-api-service";

@Injectable({
  providedIn: 'root'
})
export class ListGatewayService extends GenericApiBase {
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  override URL_BASE = 'gateway/';
}
