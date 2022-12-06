import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeripheralListPipe } from './peripheral-list.pipe';



@NgModule({
  declarations: [
    PeripheralListPipe
  ],
  exports:[
    PeripheralListPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PeripheralListPipeModule { }
