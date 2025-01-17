import { EmployeDto } from './../../../proxy/employe/models';
import { EmployeService } from './../../../proxy/employe/employe.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// import { EmployeDto } from '../../../proxy/employe';
import { PointageDto, PointageService } from '../../../proxy/pointage';
import { StatutDto, StatutService } from '../../../proxy/statuts';

@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrl: './pointage.component.scss'
})
export class PointageComponent implements OnInit {
  form!: FormGroup;
  pointages: PointageDto[] = [];
  pointage: PointageDto = {};
  pointagesDialog = false;
  cols: { field: string; header: string }[] = [];
  loading = true;
  rowsPerPageOptions = [5, 10, 20];
  employes: any[] = [];  // Liste des employés
  deleteproduitsDialog: boolean = false;
  statuts: StatutDto[] = []; // Déclarez la variable statuts en tant que tableau
  pointageForm!: FormGroup;


  @ViewChild('dt') dt?: Table;

  constructor(
    private pointageService: PointageService,
    private statutService:StatutService,
    private employeService : EmployeService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initColumns();
    this.buildForm();
    this.getAllEmployes();
    this.loadStatutsOptions(); // Appeler la méthode pour charger les données
    this.loadEmploye();



    // Écouter les changements sur le champ heure_entree
    this.pointageForm.get('heure_entree')?.valueChanges.subscribe((value) => {
      this.updateStatus(value);
    })
  }

  // Initialiser les colonnes pour le tableau
  private initColumns(): void {
    this.cols = [
      { field: 'fullname', header: 'Employe' },
      { field: 'date', header: 'Date' },
      { field: 'heure_entree', header: 'Heure D\'entre' },
      { field: 'statusLibelle', header: 'Etat' },
      { field: 'heure_sortie', header: 'Heure de Sortie' },
      { field: 'duree_travaillee', header: 'Duree de Travail' },
    ];
  }

// Supprimer  produits
  deleteProduits(pointage: PointageDto) {
    this.deleteproduitsDialog = true;
    this.pointage = { ...pointage };
}

// Confirme la suppresion

confirmDelete(): void {
  if (this.pointage.id !== undefined) {
    this.deleteproduitsDialog = false;

    this.pointageService.delete(this.pointage.id).subscribe(
      () => {
        this.getAllEmployes(); // Rafraîchir la liste des produits
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Pointage supprimé avec succès.',
          life: 3000,
        });
        this.pointage = {}; // Réinitialiser l'objet produit
      },
      (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Une erreur est survenue lors de la suppression.',
          life: 3000,
        });
        console.error('Erreur de suppression :', error);
      }
    );
  } else {
    this.messageService.add({
      severity: 'warn',
      summary: 'Avertissement',
      detail: 'Aucun pointage sélectionné pour suppression.',
      life: 3000,
    });
  }
}
//recharge les enploye
loadEmploye(): void {
  this.loading = true;
  this.employeService.findAll().subscribe(
    (result: EmployeDto[]) => {
      // Mettre à jour la liste des employés en ajoutant le fullname
      this.employes = result.map((employe) => ({
        ...employe,
        fullname: `${employe.prenom} ${employe.nom}`
      }));
      this.loading = false;
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des employés.',
        life: 3000,
      });
      this.loading = false;
    }
  );
}

updateStatus(heureEntree: string): void {
  if (!heureEntree) {
    this.pointageForm.get('statusId')?.setValue('');
    return;
  }

  // Logique de gestion des statuts en fonction de l'heure
  const [hours, minutes] = heureEntree.split(':').map((v) => parseInt(v, 10));
  if (hours < 8 || (hours === 8 && minutes <= 30)) {
    this.pointageForm.get('statusId')?.setValue(1); // Entrée Valide
  } else if (hours >= 9) {
    this.pointageForm.get('statusId')?.setValue(3); // Hors Plage Horaire
  } else {
    this.pointageForm.get('statusId')?.setValue(2); // Entrée Tardive
  }
}

// perment de faire le changement des couleur en fonction des statuts
getSeverity(couleur: string): "success" | "info" | "warning" | "danger" | "secondary" | "contrast" | undefined {
  switch (couleur.toLowerCase()) {
    case 'vert':
      return 'success';
    case 'bleu':
      return 'info';
    case 'jaune':  // 'warn' doit être remplacé par 'warning'
      return 'warning';
    case 'rouge':
      return 'danger';  // 'error' est mappé à 'danger' dans PrimeNG
    default:
      return undefined;  // ou 'info' si vous préférez une valeur par défaut
  }
}
 // Pour Filtrer la table
    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal(
          (event.target as HTMLInputElement).value,
          'contains'
      );
    }
  // Construire le formulaire
  private buildForm(): void {
    this.form = this.fb.group({
      fullname: [`${this.pointage.employesPrenom} ${this.pointage.employesNom}`|| '', Validators.required],
      date: [this.pointage.date || '', Validators.required],
      heure_entree: [this.pointage.heure_entree || '', Validators.required],
      statusLibelle: [this.pointage.statusLibelle ],
      heure_sortie: [this.pointage.heure_sortie || '', Validators.required],
      duree_travaillee: [this.pointage.duree_travaillee || '', Validators.required],
      statusId: [this.pointage.statusId ],

    });
  }

  loadStatutsOptions() {
    this.loading = true;
    this.statutService.findAll().subscribe(
      (result) => {
        this.statuts = result; // Assurez-vous que result est un tableau
        this.loading = false;
      },

      (error) => {
        this.messageService.add({
          severity: 'danger',
          summary: 'Error',
          detail: 'Erreur Serveur',
          life: 3000,
        });
        this.loading = false;

      }

    );
    console.log(this.statuts);

  }




  // Ouvrir le formulaire pour créer un nouveau employe
  openNew(): void {
    this.pointage = {};
    this.buildForm();
    this.pointagesDialog = true;
  }
 // Fonction permettant de faire disparaitre le pop-pup
  hideDialog() {
    this.pointagesDialog = false;
  }

  //Permet d'ajouter un employe
  saveProduits(): void {
        if (this.form.invalid) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Avertissement',
                detail: 'Veuillez remplir tous les champs obligatoires.',
                life: 3000,
            });
            return;
        }

    const pointageData = this.form.value;

    if (this.pointage.id) {
        // Si l'ID du produit existe, effectuer une mise à jour
        this.pointageService.update(this.pointage.id, pointageData).subscribe(
            () => {
                this.pointagesDialog = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'pointage modifié avec succès.',
                    life: 3000,
                });
                this.pointage = {}; // Réinitialiser l'objet produit
                this.getAllEmployes(); // Rafraîchir la liste des produits
            },
            (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Erreur lors de la modification du Employé.',
                    life: 3000,
                });
                console.error('Erreur de mise à jour :', error);
                this.pointagesDialog = true; // Maintenir la boîte de dialogue ouverte
            }
        );
    } else {
        // Sinon, créer un nouveau produit
        this.pointageService.save(pointageData).subscribe(
            () => {
                this.pointagesDialog = false;
                this.getAllEmployes(); // Rafraîchir la liste des produits
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Employé ajouté avec succès.',
                    life: 3000,
                });
                this.pointage = {}; // Réinitialiser l'objet produit
            },
            (error: any) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Erreur lors de l\'ajout du Employé.',
                    life: 3000,
                });
                console.error('Erreur d\'ajout :', error);
                this.pointagesDialog = true; // Maintenir la boîte de dialogue ouverte
            }
        );
    }
}


  // Exporter les données du tableau en PDF
  exportPDF(): void {
    if (this.dt) {
      const columns = this.cols.map((col) => col.header);
      const data = this.pointages.map((row) =>
        this.cols.map((col) => (row[col.field as keyof PointageDto] || '').toString())
      );

      const doc = new jsPDF();
      autoTable(doc, {
        head: [columns],
        body: data,
      });
      doc.save('Pointage.pdf');
    }
  }

  // Éditer un produit existant
  edit(pointage: EmployeDto): void {
    if (pointage.id !== undefined) {
      this.pointageService.getOneById(pointage.id).subscribe(
        (pointageDetails: PointageDto) => {
          this.pointage = { ...pointageDetails };
          this.buildForm();
          this.pointagesDialog = true;
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Impossible de charger les détails du Employé.',
            life: 3000,
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Avertissement',
        detail: 'Le produit sélectionné est invalide.',
        life: 3000,
      });
    }
  }

  // Charger tous les employe
  private getAllEmployes(): void {
    this.loading = true;
    this.pointageService.findAll().subscribe(
      (result: PointageDto[]) => {
        this.pointages = result;
        this.loading = false;
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors du chargement des Employés.',
          life: 3000,
        });
        this.loading = false;
      }
    );
  }
}

