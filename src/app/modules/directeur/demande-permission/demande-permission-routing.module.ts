import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandePermissionComponent } from './demande-permission.component';

const routes: Routes = [{ path: '', component: DemandePermissionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandePermissionRoutingModule { }
