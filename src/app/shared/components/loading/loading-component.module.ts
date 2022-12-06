import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoadingComponent} from './loading.component';


@NgModule({
  declarations: [
    LoadingComponent
  ],
  exports:[
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class LoadingComponentModule {
}
