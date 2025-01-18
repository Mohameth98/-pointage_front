import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbsentRoutingModule } from './absent-routing.module';
import { AbsentComponent } from './absent.component';


@NgModule({
  declarations: [
    AbsentComponent
  ],
  imports: [
    CommonModule,
    AbsentRoutingModule
  ]
})
export class AbsentModule { }
