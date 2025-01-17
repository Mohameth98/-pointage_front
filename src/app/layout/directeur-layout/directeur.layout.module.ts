import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DirecteurLayoutComponent } from './directeur.layout.component';
import { DirecteurMenuComponent } from './directeur.menu.component';
import { DirecteurSidebarComponent } from './directeur.sidebar.component';

@NgModule({
    declarations: [
        DirecteurLayoutComponent,
        DirecteurMenuComponent,
        DirecteurSidebarComponent,
    ],
    imports: [
       SharedModule
    ],
    exports: [DirecteurLayoutComponent]
})
export class DirecteurLayoutModule { }
