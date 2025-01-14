import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'backoffice-menu',
    templateUrl: './backoffice.menu.component.html'
})
export class BackofficeMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Backoffice',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/backoffice'] }
                ]
            },
            {
                label: 'Gestion Des Comptes',

                items: [
                    {
                        label: 'Compte Boite Postale',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['/backoffice/compte-bp']
                    },
                    {
                        label: 'Compte Budget',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['/backoffice/compte-budget']
                    },
                    {
                        label: 'Compte Ecom',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['/backoffice/compte-ecom']
                    },
                    {
                        label: 'Compte Produit',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['/backoffice/compte-produit']
                    },

                    {
                        label: 'Service Regularisation',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['/backoffice/service-regularisation']
                    }
                ],

            },
            {
                label: 'Paramétres',
                icon: 'pi pi-fw pi-briefcase',
                items: [

                    {
                        label: 'Paramétres',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: 'Produits',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/produits']
                            },
                            
                            {
                                label: 'Monnaie',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/monnaies']
                            },
                            {
                                label: 'Type Régularisation',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/type-regularisation']
                            },

                            {
                                label: 'Type Service',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/backoffice/type-service']
                            },

                        ]
                    },

                ]
            },
            {
                label: '',
                items: [
                    {
                        label: 'Choix Modules',
                        icon: 'pi pi-fw pi-list',
                        style: { color: '#17A2B8' },
                        routerLink: ['/'],
                    },
                ],
            },
        ];
    }
}
