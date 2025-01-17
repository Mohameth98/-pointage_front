import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsEmployeComponent } from './details-employe.component';

const routes: Routes = [{ path: '', component: DetailsEmployeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsEmployeRoutingModule { }
