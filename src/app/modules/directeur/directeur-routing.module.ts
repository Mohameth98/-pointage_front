import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'pointage', loadChildren: () => import('./pointage/pointage.module').then(m => m.PointageModule) }, { path: 'demande-permission', loadChildren: () => import('./demande-permission/demande-permission.module').then(m => m.DemandePermissionModule) }, { path: 'absent', loadChildren: () => import('./absent/absent.module').then(m => m.AbsentModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirecteurRoutingModule { }
