import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { BackofficeLayoutComponent } from './layout/backoffice-layout/backoffice.layout.component';



const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,canActivate: [AuthGuard],
    children: [
      {
        path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
      },
    ]
  },
  {
    path: 'backoffice', component: BackofficeLayoutComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] },

    loadChildren: () => import('./modules/backoffice/backoffice.module').then(m => m.BackofficeModule),

  },

  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
