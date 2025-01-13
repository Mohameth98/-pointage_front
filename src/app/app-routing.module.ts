import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  // {
  //   path: 'backoffice', component: BackofficeLayoutComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] },
  //   loadChildren: () => import('./modules/backoffice/backoffice.module').then(m => m.BackofficeModule),

  // },

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
