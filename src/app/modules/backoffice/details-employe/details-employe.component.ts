import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EmployeService } from '../../../proxy/employe';

@Component({
  selector: 'app-details-employe',
  templateUrl: './details-employe.component.html',
  styleUrls: ['./details-employe.component.scss']
})
export class DetailsEmployeComponent implements OnInit {
  employe: any = {};
  employeId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private employeService: EmployeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.employeId = params['id'];  // Récupérer l'ID de l'URL

      if (this.employeId) {
        this.getEmployeDetails(this.employeId);
      } else {
        console.error('ID de l\'employé est manquant');
      }
    });
  }

  getEmployeDetails(id: number): void {
    console.log('Appel du service pour récupérer les informations de l\'employé');

    this.employeService.getOneById(id).subscribe(
      (employe) => {
        this.employe = employe;
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations de l\'employé', error);
      }
    );
  }

  editUser(): void {
    // Implémentation pour l'édition des informations utilisateur
  }
}
