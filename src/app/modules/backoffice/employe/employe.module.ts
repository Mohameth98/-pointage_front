import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeRoutingModule } from './employe-routing.module';
import { EmployeComponent } from './employe.component';
import { SharedComponentModule } from '../../../layout/shared/shared-component.module';


@NgModule({
  declarations: [
    EmployeComponent
  ],
  imports: [
    SharedComponentModule,
    EmployeRoutingModule
  ]
})
export class EmployeModule { }
