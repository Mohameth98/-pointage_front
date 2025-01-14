import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';

const routes: Routes = [
  { path: '', component: BackofficeComponent },
  { path: 'employe', loadChildren: () => import('./employe/employe.module').then(m => m.EmployeModule) },
  { path: 'produits', loadChildren: () => import('./produits/produits.module').then(m => m.ProduitsModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
