import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'directeur-menu',
    templateUrl: './directeur.menu.component.html'
})
export class DirecteurMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Directeur',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/directeur'] }
                ]
            },
            {
                label: 'POINTAGE',

                items: [
                    {
                        label: 'Geston du Pointage',
                        icon: 'pi pi-fw pi-pen-to-square',
                        routerLink: ['/directeur/pointage']
                    },
                    {
                        label: 'Gestion des Absents',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/directeur/absent']
                    },

                    {
                      label: 'Gestion des Demandes',
                      icon: 'pi pi-fw pi pi-file',
                      routerLink: ['/directeur/demande-permission']
                  },

                ],

            },
            {
                label: 'Paramétres',
                icon: 'pi pi-fw pi-briefcase',
                items: [

                    {
                        label: 'Rapport',
                        icon: 'pi pi-fw pi-cog',
                        items: [

                            {
                                label: 'Rapport du Mois',
                                icon: 'pi pi-fw pi-angle-right',
                                routerLink: ['/directeur/rapport']
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
