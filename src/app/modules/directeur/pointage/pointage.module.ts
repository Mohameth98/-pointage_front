import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointageRoutingModule } from './pointage-routing.module';
import { PointageComponent } from './pointage.component';
import { SharedComponentModule } from '../../../layout/shared/shared-component.module';


@NgModule({
  declarations: [
    PointageComponent
  ],
  imports: [
    SharedComponentModule,
    PointageRoutingModule
  ]
})
export class PointageModule { }
