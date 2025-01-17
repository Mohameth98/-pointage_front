import { NgModule } from '@angular/core';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { BackofficeComponent } from './backoffice.component';
import { SharedComponentModule } from '../../layout/shared/shared-component.module';
import { ChartModule } from 'primeng/chart';



@NgModule({
  declarations: [
    BackofficeComponent,
  ],
  imports: [
    SharedComponentModule,
    BackofficeRoutingModule,
    ChartModule
  ]
})
export class BackofficeModule { }
