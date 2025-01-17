import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointageComponent } from './pointage.component';

const routes: Routes = [{ path: '', component: PointageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointageRoutingModule { }
