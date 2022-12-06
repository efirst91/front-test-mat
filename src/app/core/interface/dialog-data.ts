import {Gateway} from "./gateway/gateway-req";
import {Peripheral} from "./peripheral/peripheral-req";
import {TableAction} from "../utils/utils";

export interface DialogData {
  title: string;
  action: TableAction;
  row: Gateway | Peripheral | null
}
