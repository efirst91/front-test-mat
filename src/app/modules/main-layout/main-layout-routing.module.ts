import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./main-layout.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'gateway',
        loadChildren: () => import('../gateway/gateway.module').then(m => m.GatewayModule),
        data: {
          title: 'Gateway Section'
        }
      },
      {
        path: 'peripheral',
        loadChildren: () => import('../peripheral/peripheral.module').then(m => m.PeripheralModule),
        data: {
          title: 'Peripheral Section'
        },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'gateway'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'gateway'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule {
}
