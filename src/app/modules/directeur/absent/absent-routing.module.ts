import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbsentComponent } from './absent.component';

const routes: Routes = [{ path: '', component: AbsentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbsentRoutingModule { }
