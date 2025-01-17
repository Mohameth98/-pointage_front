import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirecteurRoutingModule } from './directeur-routing.module';
import { ChartModule } from 'primeng/chart';
import { SharedComponentModule } from '../../layout/shared/shared-component.module';


@NgModule({
  declarations: [],
  imports: [
    SharedComponentModule,
    DirecteurRoutingModule,
    ChartModule,


  ]
})
export class DirecteurModule { }
