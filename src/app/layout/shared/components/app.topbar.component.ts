import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from "../../service/app.layout.service";
// import { AuthService } from 'src/app/proxy/auth/auth.service';
import { Router } from '@angular/router';
import { SessionService } from '../../../proxy/auth/Session.service';
// import { KeycloakService } from 'keycloak-angular';
// import { KeycloakProfile } from 'keycloak-js';

// import { JournalDto } from 'src/app/proxy/journal';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{
    public isLoggedIn = false;
    //public userProfile: KeycloakProfile | null = null;
    fullname = "";
    structureLibelle = "";

    searchCode: string = '';
    loading: Boolean= false;
    //


    years: { label: string; value: number }[] = [];

      annee: number | null = null;

    items: MenuItem[] = [];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private router:Router, private sessionService: SessionService,
                private messageService: MessageService,
    ) { }
    public async ngOnInit() {
       // const userRoles = this.keycloak.getUserRoles();

    // Define items based on roles
    this.items = [
        // ...(userRoles.includes('ROLE_DCG') ? [{ label: 'DCG', icon: 'pi pi-unlock', command: () => { this.router.navigate(['/dcg']); } }] : []),
        // ...(userRoles.includes('ROLE_GUICHET') ? [{ label: 'GUICHET', icon: 'pi pi-unlock', command: () => { this.router.navigate(['/guichet']); } }] : []),
        // ...(userRoles.includes('ROLE_DRP') ? [{ label: 'DRP', icon: 'pi pi-unlock', command: () => { this.router.navigate(['/drp']); } }] : []),
        // ...(userRoles.includes('ROLE_RECEVEUR') ? [{ label: 'RECEVEUR', icon: 'pi pi-unlock', command: () => { this.router.navigate(['/receveur']); } }] : []),
        // { separator: true },
        { label: 'Déconnexion', icon: 'pi pi-sign-out'
          , command: () => {
            //  this.keycloak.logout(environment.keycloak.redirectUri);
            sessionStorage.clear();
         } }
    ];
    


  }
}
