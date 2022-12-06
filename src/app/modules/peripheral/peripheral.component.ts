import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {ColumData} from "../../core/interface/columns";
import {getCorrectTitle, Status, TableAction, TableField} from "../../core/utils/utils";
import {NotificationsService} from "../../core/services/notifications.service";
import {PeripheralCrudService} from "./services/crud/peripheral-crud.service";
import {ListPeripheralService} from "./services/list/list.service";
import {Peripheral} from "../../core/interface/peripheral/peripheral-req";
import {DialogData} from "../../core/interface/dialog-data";
import {MatDialogConfig} from "@angular/material/dialog/dialog-config";
import {EditComponent} from "./edit/edit.component";

@Component({
  selector: 'app-peripheral',
  templateUrl: './peripheral.component.html',
  styleUrls: ['./peripheral.component.scss'],
  providers: [NotificationsService]
})
export class PeripheralComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
    private _notificationService: NotificationsService,
    private _peripheralCrudService: PeripheralCrudService,
    private _peripheralListService: ListPeripheralService,
  ) {
  }

  private subject: Subject<void> = new Subject<void>();
  private observeLoad$ = this.subject.asObservable();
  public TableAction: typeof TableAction = TableAction;
  public dataSource!: Peripheral[];
  public displayedColumns!: string[];
  public columns: ColumData[] = [];
  public selection = new SelectionModel<Peripheral>(true, []);
  public loadingData: boolean = true;
  public TableField: typeof TableField = TableField;
  public Status: typeof Status = Status;


  /**
   * Load all peripheral from db
   * @private
   */
  private loadData(): void {
    this._peripheralListService.getAllValues().subscribe(
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
   * Add new peripheral
   * @param newValue new value to add
   * @private
   */
  private addNewPeripheral(newValue: Peripheral) {
    this._peripheralCrudService.createValue(newValue).subscribe(
      {
        next: () => {
          this.subject.next();
          this._notificationService.openMessage('Peripheral  was added successfully', 'success');
          this.selection.clear();
        },
        error: () => {
          this._notificationService.openMessage('Error while trying to add new peripheral', 'error')
          this.selection.clear();
          this.loadingData = false;
        }
      }
    )
  }

  /**
   * Delete peripheral
   * @param row element that will be deleted
   * @private
   */
  private deletePeripheral(row: Peripheral) {
    const id = row._id as string;
    this._peripheralCrudService.deleteById(id).subscribe(
      {
        next: () => {
          this.subject.next();
          this._notificationService.openMessage('Peripheral was deleted successfully', 'success');
          this.selection.clear();
        },
        error: () => {
          this._notificationService.openMessage('Error while trying to delete peripheral', 'error')
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
  private updatePeripheral(row: Peripheral) {
    const id = row._id as string;
    const body = row as Peripheral;
    this._peripheralCrudService.updateById(id, body).subscribe(
      {
        next: () => {
          this.subject.next();
          this._notificationService.openMessage('Peripheral was updated successfully', 'success');
          this.selection.clear();
        },
        error: () => {
          this._notificationService.openMessage('Error while trying to update peripheral', 'error')
          this.selection.clear();
          this.loadingData = false;
        }
      }
    )
  }

  /**
   * Set all columns that will be displayed into peripheral table
   * @private
   */
  private initAllDisplayedColumns(): void {
    this.displayedColumns = [
      'select',
      'uid',
      'vendor',
      'dateCreated',
      'status',
      'actions'
    ];

    this.columns = [
      {
        name: '',
        field: 'select'
      },
      {
        name: 'Uid',
        field: 'uid'
      },
      {
        name: 'Vendor',
        field: 'vendor'
      },
      {
        name: 'Date created',
        field: 'dateCreated'
      },
      {
        name: 'Status',
        field: 'status'
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
  public checkboxLabel(index: number, row?: Peripheral): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${index + 1}`;
  }

  /**
   * Add action
   */
  public onAction(action: TableAction, row?: Peripheral): void {
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
              this.addNewPeripheral(value);
            }

            if (action === TableAction.DELETE) {
              this.deletePeripheral(row as Peripheral);
            }

            if (action === TableAction.UPDATE) {
              value._id = row?._id;
              this.updatePeripheral(value as Peripheral);
            }
          }
        }
      }
    )
  }

  /**
   * Delete a group of elements
   */
  public onDeleteGroup(): void {
    let ids: string[] = [];
    const selectedPeripherals = this.selection.selected;
    for (const item of selectedPeripherals) {
      ids.push(item._id as string);
    }

    this.loadingData = true;
    this._peripheralCrudService.deleteGroup(ids).subscribe(
      {
        next: (response) => {
          if (response.success) {
            this._notificationService.openMessage('Element were deleted successfully', 'success');
            this.subject.next();

          } else {
            this._notificationService.openMessage('Error when trying to delete a group of peripherals', 'error');
          }
          this.selection.clear();
        },
        error: () => {
          this._notificationService.openMessage('Error when trying to delete a group of peripherals', 'error')
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
