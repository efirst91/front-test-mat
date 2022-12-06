import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PeripheralComponent} from "./peripheral.component";

const routes: Routes = [
  {
    path: '',
    component: PeripheralComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeripheralRoutingModule {
}
