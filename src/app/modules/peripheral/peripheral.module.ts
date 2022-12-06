import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PeripheralRoutingModule} from './peripheral-routing.module';
import {PeripheralComponent} from './peripheral.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {GatewayRoutingModule} from "../gateway/gateway-routing.module";
import {LoadingComponentModule} from "../../shared/components/loading/loading-component.module";
import {EditComponent} from "./edit/edit.component";
import {HaveParentModule} from "../../core/pipes/have-parent/have-parent.module";


@NgModule({
  declarations: [
    PeripheralComponent,
    EditComponent
  ],
  exports: [
    PeripheralComponent
  ],
  imports: [
    CommonModule,
    PeripheralRoutingModule,
    MatDialogModule,
    MatTooltipModule,
    GatewayRoutingModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatMenuModule,
    MatListModule,
    LoadingComponentModule,
    ReactiveFormsModule,
    HaveParentModule
  ]
})
export class PeripheralModule {
}
