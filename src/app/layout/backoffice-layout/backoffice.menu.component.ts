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
                label: 'Gestion des Parametres',

                items: [
                    {
                        label: 'Produits',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['/backoffice/produits']
                    },
                    {
                        label: 'Employes',
                        icon: 'pi pi-fw pi-angle-right',
                        routerLink: ['/backoffice/employe']
                    },

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
