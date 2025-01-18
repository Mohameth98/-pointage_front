import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from "../../service/app.layout.service";
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public realm_access: KeycloakTokenParsed | null = null;
  fullname = "";
  loading: Boolean = false;
  years: { label: string; value: number }[] = [];
  annee: number | null = null;
  items: MenuItem[] = [];

  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;
  KeycloakTokenParsed: any;

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private readonly keycloak: KeycloakService
  ) {}

  public async ngOnInit() {
    // Vérification de la connexion
    this.isLoggedIn = await this.keycloak.isLoggedIn();


    // Définir les éléments du menu en fonction des rôles de l'utilisateur
    const userRoles = this.keycloak.getUserRoles();
    this.items = [
      { separator: true },
      {
        label: 'Déconnexion',
        icon: 'pi pi-sign-out',
        command: () => {
          this.keycloak.logout(environment.keycloak.redirectUri);
          sessionStorage.clear();
        }
      }
    ];

    // Si l'utilisateur est connecté, charger son profil
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.fullname = this.userProfile.firstName + " " + this.userProfile.lastName;
      this.realm_access = this.KeycloakTokenParsed.realm_access;

    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }
}
