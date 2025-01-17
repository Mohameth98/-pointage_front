import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';

const routes: Routes = [
  { path: '', component: BackofficeComponent },
  { path: 'employe', loadChildren: () => import('./employe/employe.module').then(m => m.EmployeModule) },
  { path: 'statut', loadChildren: () => import('./statut/statut.module').then(m => m.StatutModule) },
  { path: 'details-employe/:id', loadChildren: () => import('./details-employe/details-employe.module').then(m => m.DetailsEmployeModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
