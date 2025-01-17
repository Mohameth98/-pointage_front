import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'directeur-sidebar',
    templateUrl: './directeur.sidebar.component.html'
})
export class DirecteurSidebarComponent {
    constructor(public layoutService: LayoutService, public el: ElementRef) { }
}

