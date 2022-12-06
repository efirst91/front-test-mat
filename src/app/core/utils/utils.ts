import {AbstractControl} from "@angular/forms";

export const IPV4_VALIDATOR = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
export const NUMBER_VALIDATOR = "[0-9]{0,9}";
export const LETTERS_SPACE_VALIDATOR = '^[a-zA-Z_ ]*$';

export enum TableField {
  ACTIONS = 'actions',
  PERIPHERAL_DEVICES = 'peripheralsDevices',
  SELECT = 'select',
  STATUS = 'status'
}

export enum Status {
  OFFLINE = 'false',
  ONLINE = 'true'
}

export enum TableAction {
  UPDATE = 'update',
  DELETE = 'delete',
  NEW = 'new'
}

/**
 * Get correct title form modal view
 * @function
 */
export function getCorrectTitle(action: TableAction): string {
  let result = '';
  if (action === TableAction.NEW) {
    result = 'New element'
  }
  if (action === TableAction.DELETE) {
    result = 'Delete element'
  }
  if (action === TableAction.UPDATE) {
    result = 'Edit element'
  }

  return result;
}

/**
 * Validator ipv4
 * @param control
 */
export function ageRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const result = null;

  if (control.value !== undefined && (isNaN(control.value) || control.value < 18 || control.value > 45)) {
    let test = false;
    try {
      test = IPV4_VALIDATOR.test(control.value);

    } catch (e) {
      console.log('Error has occurred ', e)
    }
    if (!test) {
      return {'ipV4Invalid': true};
    }
  }
  return result;
}

