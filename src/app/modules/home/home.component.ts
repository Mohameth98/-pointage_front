import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../layout/service/app.layout.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

    constructor(public layoutService: LayoutService,
                private keycloakService : KeycloakService,
         public router: Router,
          ) { }

    ngOnInit(): void {
        this.redirectBasedOnRole();
    }

    public isAdmin(): boolean {
      const userRoles = this.keycloakService.getUserRoles();
      return userRoles.includes('ROLE_ADMIN');
    }


    async redirectBasedOnRole(): Promise<void>{
      const userRoles = this.keycloakService.getUserRoles();

      const isAdmin = userRoles.includes('ROLE_ADMIN');

      if (isAdmin) {
          this.router.navigate(['/']);
      }
      else {
          this.router.navigate(['/']);
      }
  }
}
