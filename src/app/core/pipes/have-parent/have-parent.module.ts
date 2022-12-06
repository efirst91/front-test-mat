import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HaveParentPipe } from './have-parent.pipe';



@NgModule({
  declarations: [
    HaveParentPipe
  ],
  exports: [
    HaveParentPipe
  ],
  imports: [
    CommonModule
  ]
})
export class HaveParentModule { }
