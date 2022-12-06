import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatSnackBarConfig} from "@angular/material/snack-bar/snack-bar-config";

@Injectable()
export class NotificationsService {

  constructor(private _snackBar: MatSnackBar) {
  }

  /**
   * Show message dialog
   * @param message message string
   * @param type types of message
   * @param duration duration of snack bar
   */
  public openMessage(message: string, type: string, duration?: number): void {
    const snackConf: MatSnackBarConfig = {
      duration: duration || 2000,
    }
    this._snackBar.open(message, type, snackConf);
  }

}
