import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from "../../service/app.layout.service";
import { Router } from '@angular/router';
import { SessionService } from '../../../proxy/auth/Session.service';
import { environment } from '../../../../environments/environment';
import { KeycloakService } from 'keycloak-angular';
 import { KeycloakProfile } from 'keycloak-js';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{
    public isLoggedIn = false;
    public userProfile: KeycloakProfile | null = null;
    fullname = "";
    loading: Boolean= false;



    years: { label: string; value: number }[] = [];

      annee: number | null = null;

    items: MenuItem[] = [];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
       private router:Router,
       private sessionService: SessionService,
       private readonly keycloak: KeycloakService,
       private messageService: MessageService,
    ) { }
    public async ngOnInit() {
       const userRoles = this.keycloak.getUserRoles();

    // Define items based on roles
    this.items = [
          { separator: true },
        { label: 'Déconnexion', icon: 'pi pi-sign-out'
          , command: () => {
              this.keycloak.logout(environment.keycloak.redirectUri);
            sessionStorage.clear();
         } }
    ];

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.fullname = this.userProfile.firstName + " " + this.userProfile.lastName;
    }

  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }
}
