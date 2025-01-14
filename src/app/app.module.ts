import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { AppLayoutModule } from './layout/app.layout.module';
import { BackofficeLayoutModule } from './layout/backoffice-layout/backoffice.layout.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppLayoutModule,
    BackofficeLayoutModule,
    AppRoutingModule,
    RouterModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
