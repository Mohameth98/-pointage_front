import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatutRoutingModule } from './statut-routing.module';
import { StatutComponent } from './statut.component';
import { SharedComponentModule } from '../../../layout/shared/shared-component.module';


@NgModule({
  declarations: [
    StatutComponent
  ],
  imports: [
    SharedComponentModule,
    StatutRoutingModule
  ]
})
export class StatutModule { }
