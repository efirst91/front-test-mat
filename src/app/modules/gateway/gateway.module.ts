import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";

import {LoadingComponentModule} from "../../shared/components/loading/loading-component.module";
import {PeripheralListPipeModule} from "../../core/pipes/peripheral-list/peripheral-list.module";

import {GatewayRoutingModule} from './gateway-routing.module';
import {GatewayComponent} from './gateway.component';
import {EditComponent} from './edit/edit.component';


@NgModule({
  declarations: [
    GatewayComponent,
    EditComponent
  ],
  exports: [
    GatewayComponent,
  ],
  imports: [
    CommonModule,
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
    PeripheralListPipeModule,
    ReactiveFormsModule
  ]
})
export class GatewayModule {
}
