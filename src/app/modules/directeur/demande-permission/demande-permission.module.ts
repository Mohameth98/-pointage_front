import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandePermissionRoutingModule } from './demande-permission-routing.module';
import { DemandePermissionComponent } from './demande-permission.component';


@NgModule({
  declarations: [
    DemandePermissionComponent
  ],
  imports: [
    CommonModule,
    DemandePermissionRoutingModule
  ]
})
export class DemandePermissionModule { }
