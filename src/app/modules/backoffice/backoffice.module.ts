import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { BackofficeComponent } from './backoffice.component';
import { SharedComponentModule } from '../../layout/shared/shared-component.module';
import { ChartModule } from 'primeng/chart';
import { SharedModule } from '../../layout/shared/shared.module';
import { RouterModule } from '@angular/router';


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
