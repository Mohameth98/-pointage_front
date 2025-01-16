import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatutComponent } from './statut.component';

const routes: Routes = [{ path: '', component: StatutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatutRoutingModule { }
