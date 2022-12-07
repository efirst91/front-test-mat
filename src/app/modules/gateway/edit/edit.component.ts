import {Component, Inject, OnInit} from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {lastValueFrom} from "rxjs";
import {PeripheralStatus} from "../../../core/interface/peripheral-status";
import {DialogData} from "../../../core/interface/dialog-data";
import {ActionFunctions} from "../../../core/interface/action-functions";
import {Gateway} from "../../../core/interface/gateway/gateway-req";
import {ageRangeValidator, LETTERS_SPACE_VALIDATOR, NUMBER_VALIDATOR, TableAction} from "../../../core/utils/utils";
import {Peripheral} from "../../../core/interface/peripheral/peripheral-req";
import {PeripheralCrudService} from "../../peripheral/services/crud/peripheral-crud.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<EditComponent>,
    private _peripheralCrudService: PeripheralCrudService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.createForm();
  }

  public formEdit!: FormGroup;
  public peripheralStatus!: PeripheralStatus[];
  private actionFunction!: ActionFunctions;
  public TableAction: typeof TableAction = TableAction;
  public peripheralListByGateway!: Peripheral[];
  public loadingPeripheralsData: boolean = false;


  /**
   * Form of gateway with associated controls
   * @private
   */
  private createForm(): void {
    this.formEdit = this._fb.group({
      serialNumber: [''],
      humanReadableName: ['', [Validators.required]],
      ipv4: ['', [Validators.required, ageRangeValidator]],
      peripheralsDevices: this._fb.array([])
    })
  }

  /**
   * Create a peripheral status
   * @private
   */
  private initPeripheralStatus(): void {
    this.peripheralStatus = [
      {
        name: 'Online',
        value: true
      },
      {
        name: 'Offline',
        value: false
      }
    ]
  }

  /**
   * Fill data in case that theirs are received into data property
   * @see {DialogData} data
   * @private
   */
  private fillIncomingData(): void {
    if (this.data?.row) {
      this.actionFunction[this.data.action]();
    }
  }

  /**
   * Action tha will be manage by this action function array
   * @private
   */
  private createActionFunction(): void {
    this.actionFunction = {
      update: () => this.updateValues(),
      delete: () => this.deleteValues()
    }
  }

  /**
   * Update validation and values when action are update
   * @private
   */
  private updateValues(): void {
    const gateway = this.data.row as Gateway;
    this.formEdit.get('serialNumber')?.setValue(gateway.serialNumber);
    this.formEdit.get('humanReadableName')?.setValue(gateway.humanReadableName);
    this.formEdit.get('ipv4')?.setValue(gateway.ipv4);
    this.searchPeripheral(gateway).then();
  }

  /**
   * Update validation and values when action are delete
   * @private
   */
  private deleteValues(): void {
    this.formEdit.get('humanReadableName')?.clearValidators();
    this.formEdit.get('humanReadableName')?.updateValueAndValidity();
    this.formEdit.get('ipv4')?.clearValidators();
    this.formEdit.get('ipv4')?.updateValueAndValidity();
  }

  /**
   * Fill the complete list of peripheral devices for each gateway
   */
  public async searchPeripheral(element: Gateway): Promise<void> {
    this.peripheralListByGateway = [];
    this.loadingPeripheralsData = true;
    const peripheralIds = element.peripheralsDevices;
    for (const id of peripheralIds) {
      const {data} = await lastValueFrom(this._peripheralCrudService.getById(id));
      const peripheral = data.peripheral as Peripheral
      this.addPeripheral(peripheral);
    }
    this.loadingPeripheralsData = false;
  }

  /**
   * Close dialog reference
   * @private
   */
  public onClose(): void {
    this._dialogRef.close()
  }

  /**
   * Get all peripheral devices added to the actual gateway
   */
  public peripherals() {
    return this.formEdit.controls['peripheralsDevices'] as FormArray;
  }

  /**
   * Method tha emit the value to the parent after close dialog
   */
  public onAccept(): void {
    if (this.data.action === TableAction.NEW) {
      const serial = uuidv4();
      this.formEdit.get('serialNumber')?.setValue(serial);
    }
    this._dialogRef.close(this.formEdit.value)
  }

  /**
   * Add new peripheral
   */
  public addPeripheral(peripheral?: Peripheral): void {
    const newPeripheral = this._fb.group({
      _id: [peripheral?._id ?? 0],
      uid: [peripheral?.uid ?? 0, [Validators.required, Validators.pattern(NUMBER_VALIDATOR)]],
      vendor: [peripheral?.vendor ?? '', [Validators.required, Validators.pattern(LETTERS_SPACE_VALIDATOR)]],
      dateCreated: [new Date()],
      status: [peripheral?.status ?? true, [Validators.required]]
    });

    this.peripherals().push(newPeripheral);
  }

  /**
   * Delete an element from array items
   * @param index index element that will be deleted
   */
  public onDeleteItem(index: number): void {
    this.peripherals().removeAt(index);
  }


  ngOnInit(): void {
    this.createActionFunction();
    this.initPeripheralStatus();
    this.fillIncomingData();
  }

}
