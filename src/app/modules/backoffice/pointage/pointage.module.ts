import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointageRoutingModule } from './pointage-routing.module';
import { PointageComponent } from './pointage.component';


@NgModule({
  declarations: [
    PointageComponent
  ],
  imports: [
    CommonModule,
    PointageRoutingModule
  ]
})
export class PointageModule { }
