import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../layout/service/app.layout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

    constructor(public layoutService: LayoutService,
         public router: Router,
          ) { }

    ngOnInit(): void {
        this.redirectBasedOnRole();
    }

      async redirectBasedOnRole(): Promise<void>{

}
}
