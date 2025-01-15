import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { AppLayoutModule } from './layout/app.layout.module';
import { BackofficeLayoutModule } from './layout/backoffice-layout/backoffice.layout.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';
import { CurrencyPipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { EventService } from './demo/service/event.service';
import { CustomerService } from './demo/service/customer.service';
import { CountryService } from './demo/service/country.service';
import { PhotoService } from './demo/service/photo.service';


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
          realm :environment.keycloak.realm,
          clientId : environment.keycloak.clientId,
          url : environment.keycloak.authority
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppLayoutModule,
    KeycloakAngularModule,
    BackofficeLayoutModule,
    AppRoutingModule,
    RouterModule,
    ToastModule
  ],



  providers: [
    {provide: APP_INITIALIZER, useFactory:initializeKeycloak,multi :true, deps:[KeycloakService]},
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    CountryService, CustomerService, EventService, IconService, NodeService,
    PhotoService, CurrencyPipe, //authInterceptorProviders

],
  bootstrap: [AppComponent]
})
export class AppModule { }
