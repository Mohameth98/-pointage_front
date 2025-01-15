import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';

const routes: Routes = [
  { path: '', component: BackofficeComponent },
  { path: 'employe', loadChildren: () => import('./employe/employe.module').then(m => m.EmployeModule) },
  { path: 'pointage', loadChildren: () => import('./pointage/pointage.module').then(m => m.PointageModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
