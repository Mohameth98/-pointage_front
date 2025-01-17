import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

import { DetailsEmployeRoutingModule } from './details-employe-routing.module';
import { DetailsEmployeComponent } from './details-employe.component';
import { SharedComponentModule } from '../../../layout/shared/shared-component.module';


@NgModule({
  declarations: [
    DetailsEmployeComponent
  ],
  imports: [
    SharedComponentModule,
    CardModule,
    DetailsEmployeRoutingModule
  ]
})
export class DetailsEmployeModule { }
