import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatDialogConfig} from "@angular/material/dialog/dialog-config";
import {lastValueFrom, Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";

import {ListGatewayService} from "./services/list/list-gateway.service";
import {GatewayCrudService} from "./services/crud/gateway-crud.service";
import {EditComponent} from "./edit/edit.component";
import {DialogData} from "../../core/interface/dialog-data";
import {Gateway} from "../../core/interface/gateway/gateway-req";
import {ColumData} from "../../core/interface/columns";
import {getCorrectTitle, TableAction, TableField} from "../../core/utils/utils";
import {NotificationsService} from "../../core/services/notifications.service";
import {Peripheral} from "../../core/interface/peripheral/peripheral-req";
import {PeripheralCrudService} from "../peripheral/services/crud/peripheral-crud.service";

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss'],
  providers: [NotificationsService]
})
export class GatewayComponent implements OnInit {

  constructor(
    private _gatewayListService: ListGatewayService,
    private _gatewayCrudService: GatewayCrudService,
    private _dialog: MatDialog,
    private _notificationService: NotificationsService,
    private _peripheralCrudService: PeripheralCrudService
  ) {
  }

  private subject: Subject<void> = new Subject<void>();
  private observeLoad$ = this.subject.asObservable();
  private action: typeof TableAction = TableAction;

  public peripheralListByGateway!: Peripheral[];
  public TableAction: typeof TableAction = TableAction;
  public dataSource!: Gateway[];
  public displayedColumns!: string[];
  public columns: ColumData[] = [];
  public TableField: typeof TableField = TableField;
  public loadingData: boolean = true;
  public loadingPeripheralsData: boolean = false;
  public selection = new SelectionModel<Gateway>(true, []);


  /**
   * Load all gateways from db
   * @private
   */
  private loadData(): void {
    this._gatewayListService.getAllValues().subscribe(
      {
        next: (response: any) => {
          this.dataSource = response.data;
          this.loadingData = false;
        },
        error: () => this.loadingData = false
      }
    )
  }

  /**
   * Add new gateway
   * @param newValue new value to add
   * @private
   */
  private addNewGateway(newValue: Gateway) {
    this._gatewayCrudService.createValue(newValue).subscribe(
      {
        next: () => {
          this.subject.next();
          this._notificationService.openMessage('Gateway was added successfully', 'success')
          this.selection.clear();
        },
        error: () => {
          this._notificationService.openMessage('Error while trying to add new gateway', 'error')
          this.selection.clear();
          this.loadingData = false;
        }
      }
    )
  }

  /**
   * Delete gateway
   * @param row element that will be deleted
   * @private
   */
  private deleteGateway(row: Gateway) {
    const id = row._id as string;
    this._gatewayCrudService.deleteById(id).subscribe(
      {
        next: () => {
          this.subject.next();
          this._notificationService.openMessage('Gateway was deleted successfully', 'success');
          this.selection.clear();
        },
        error: () => {
          this._notificationService.openMessage('Error while trying to delete gateway', 'error')
          this.selection.clear();
          this.loadingData = false;
        }
      }
    )
  }

  /**
   * Delete gateway
   * @param row element that will be deleted
   * @private
   */
  private updateGateway(row: Gateway) {
    const id = row._id as string;
    const body = row as Gateway;

    this._gatewayCrudService.updateById(id, body).subscribe(
      {
        next: () => {
          this.subject.next();
          this._notificationService.openMessage('Gateway was update successfully', 'success');
          this.selection.clear();
        },
        error: () => {
          this._notificationService.openMessage('Error while trying to update gateway', 'error')
          this.selection.clear()
          this.loadingData = false;
        }
      }
    )
  }

  /**
   * Set all columns that will be displayed into gateway table
   * @private
   */
  private initAllDisplayedColumns(): void {
    this.displayedColumns = [
      'select',
      'serialNumber',
      'humanReadableName',
      'ipv4',
      'peripheralsDevices',
      'actions'
    ];

    this.columns = [
      {
        name: '',
        field: 'select'
      },
      {
        name: 'Serial Number',
        field: 'serialNumber'
      },
      {
        name: 'Human readable name',
        field: 'humanReadableName'
      },
      {
        name: 'IpV4',
        field: 'ipv4'
      },
      {
        name: 'Peripheral devices',
        field: 'peripheralsDevices'
      },
      {
        name: '',
        field: 'actions'
      }
    ]

  }

  /**
   * Subscribe to subject next event
   * @private
   * @see subject
   */
  private subscriptions(): void {
    this.observeLoad$.subscribe({
      next: () => this.loadData()
    })
  }


  /**
   * Determinate if all values has been selected
   * @private
   */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected?.length;
    const numRows = this.dataSource?.length;
    return numSelected === numRows;
  }


  /**
   * Control of select items
   */
  public masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource);
  }

  /**
   * The label of selected row
   * @param index index of column
   * @param row selected row
   */
  public checkboxLabel(index: number, row?: Gateway): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${index + 1}`;
  }


  /**
   * Add action
   */
  public onAction(action: TableAction, row?: Gateway): void {
    const data: DialogData = {
      title: getCorrectTitle(action),
      action: action,
      row: row ?? null
    };

    const config: MatDialogConfig = {
      width: '60vw',
      data
    }

    const dialogRef = this._dialog.open(EditComponent, config);
    dialogRef.afterClosed().subscribe(
      {
        next: value => {
          if (value) {
            this.loadingData = true;
            if (action === TableAction.NEW) {
              this.addNewGateway(value);
            }

            if (action === TableAction.DELETE) {
              this.deleteGateway(row as Gateway);
            }

            if (action === TableAction.UPDATE) {
              value._id = row?._id;
              this.updateGateway(value as Gateway);
            }
          }
        }
      }
    )
  }


  /**
   * Fill the complete list of peripheral devices for each gateway
   */
  public async sendToSearchPeripheral(element: Gateway): Promise<void> {
    this.loadingPeripheralsData = true;
    this.peripheralListByGateway = [];
    const peripheralIds = element.peripheralsDevices;
    for (const id of peripheralIds) {
      const {data} = await lastValueFrom(this._peripheralCrudService.getById(id));
      const peripheral = data.peripheral as Peripheral
      this.peripheralListByGateway.push(peripheral);
    }
    this.loadingPeripheralsData = false;
  }

  /**
   * Delete a group of elements
   */
  public onDeleteGroup(): void {
    let ids: string[] = [];
    const selectedGateways = this.selection.selected;
    for (const item of selectedGateways) {
      ids.push(item._id as string);
    }
    this.loadingData = true;
    this._gatewayCrudService.deleteGroup(ids).subscribe(
      {
        next: (response) => {
          if (response.success) {
            this._notificationService.openMessage('Element were deleted successfully', 'success');
            this.subject.next();
          } else {
            this._notificationService.openMessage('Error when trying to delete a group of gateway', 'error');
          }
          this.selection.clear();

        },
        error: () => {
          this._notificationService.openMessage('Error when trying to delete a group of gateway', 'error')
          this.selection.clear();
          this.loadingData = false;
        }
      }
    )
  }

  /**
   * Update list value
   */
  public onUpdate(): void {
    this.loadingData = true;
    this.subject.next();
  }

  ngOnInit(): void {
    this.initAllDisplayedColumns();
    this.subscriptions();
    this.subject.next();
  }

}
