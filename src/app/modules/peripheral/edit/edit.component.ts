import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PeripheralStatus} from "../../../core/interface/peripheral-status";
import {DialogData} from "../../../core/interface/dialog-data";
import {ActionFunctions} from "../../../core/interface/action-functions";
import {LETTERS_SPACE_VALIDATOR, NUMBER_VALIDATOR, TableAction} from "../../../core/utils/utils";
import {Peripheral} from "../../../core/interface/peripheral/peripheral-req";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  public formEdit!: FormGroup;
  public peripheralStatus!: PeripheralStatus[];
  private actionFunction!: ActionFunctions;
  public TableAction: typeof TableAction = TableAction;

  /**
   * Form of gateway with associated controls
   * @private
   */
  private createForm(): void {
    this.formEdit = this._fb.group({
      uid: [0, [Validators.required, Validators.pattern(NUMBER_VALIDATOR)]],
      vendor: ['', [Validators.required, Validators.pattern(LETTERS_SPACE_VALIDATOR)]],
      dateCreated: [Date],
      status: [false, [Validators.required]],
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
    const peripheral = this.data.row as Peripheral;
    this.formEdit.get('uid')?.setValue(peripheral.uid);
    this.formEdit.get('vendor')?.setValue(peripheral.vendor);
    this.formEdit.get('dateCreated')?.setValue(peripheral.dateCreated);
    this.formEdit.get('status')?.setValue(peripheral.status);
  }

  /**
   * Update validation and values when action are delete
   * @private
   */
  private deleteValues(): void {
    this.formEdit.get('uid')?.clearValidators();
    this.formEdit.get('uid')?.updateValueAndValidity();
    this.formEdit.get('vendor')?.clearValidators();
    this.formEdit.get('vendor')?.updateValueAndValidity();
    this.formEdit.get('status')?.clearValidators();
    this.formEdit.get('status')?.updateValueAndValidity();
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
    this._dialogRef.close(this.formEdit.value)
  }

  /**
   * Add new peripheral
   */
  public addPeripheral(): void {
    const newPeripheral = this._fb.group({
      uid: [0, [Validators.required]],
      vendor: ['', [Validators.required]],
      dateCreated: [new Date()],
      status: [true, [Validators.required]]
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
    this.createForm();
    this.initPeripheralStatus();
    this.fillIncomingData();
  }

}
