import { Component, OnInit, ViewChild } from '@angular/core';
import { StatutDto, StatutService } from '../../../proxy/statuts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import autoTable from 'jspdf-autotable';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-statut',
  templateUrl: './statut.component.html',
  styleUrl: './statut.component.scss'
})
export class StatutComponent implements OnInit {
  form!: FormGroup;
  statuts: StatutDto[] = [];
  statut: StatutDto = {};
  statutsDialog = false;
  cols: { field: string; header: string }[] = [];
  loading = true;
  rowsPerPageOptions = [5, 10, 20];
  deletestatutsDialog: boolean = false;
  typeOptions: { label: string; value: string; }[] | undefined;


  @ViewChild('dt') dt?: Table;

  constructor(
    private statutService: StatutService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initColumns();
    this.buildForm();
    this.getAllStatuts();

    this.typeOptions =  [
      { label: 'Vert - A l\'heure', value: 'Vert' },
      { label: 'Rouge - En Absence', value: 'rouge' },
      { label: 'Bleu - Rentre avant l\'heure', value: 'bleu' },
      { label: 'Jaune - En Retard', value: 'Jaune' },
  ];
  }

  // Initialiser les colonnes pour le tableau
  private initColumns(): void {
    this.cols = [
      { field: 'ilbelle', header: 'Libelle' },
      { field: 'description', header: 'Description' },
      { field: 'couleur', header: 'Couleur' },
    ];
  }

// Supprimer  produits
  deleteStatuts(statut: StatutDto) {
    this.deletestatutsDialog = true;
    this.statut = { ...statut };
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


// Confirme la suppresion
confirmDelete(): void {
  if (this.statut.id !== undefined) {
    this.deletestatutsDialog = false;

    this.statutService.delete(this.statut.id).subscribe(
      () => {
        this.getAllStatuts(); // Rafraîchir la liste des produits
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Statut supprimé avec succès.',
          life: 3000,
        });
        this.statut = {}; // Réinitialiser l'objet produit
      },
      (error) => {
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
      detail: 'Aucun Statut sélectionné pour suppression.',
      life: 3000,
    });
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
      libelle: [this.statut.libelle || '', Validators.required],
      description: [this.statut.description || '', Validators.required],
      couleur: [this.statut.couleur || '', Validators.required],



    });
  }

  // Ouvrir le formulaire pour créer un nouveau employe
  openNew(): void {
    this.statut = {};
    this.buildForm();
    this.statutsDialog = true;
  }
 // Fonction permettant de faire disparaitre le pop-pup
  hideDialog() {
    this.statutsDialog = false;
  }

  //Permet d'ajouter un employe
  saveStatuts(): void {
        if (this.form.invalid) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Avertissement',
                detail: 'Veuillez remplir tous les champs obligatoires.',
                life: 3000,
            });
            return;
        }

    const statutData = this.form.value;

    if (this.statut.id) {
        // Si l'ID du produit existe, effectuer une mise à jour
        this.statutService.update(this.statut.id, statutData).subscribe(
            () => {
                this.statutsDialog = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Statut modifié avec succès.',
                    life: 3000,
                });
                this.statut = {}; // Réinitialiser l'objet produit
                this.getAllStatuts(); // Rafraîchir la liste des produits
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Erreur lors de la modification du Statut.',
                    life: 3000,
                });
                console.error('Erreur de mise à jour :', error);
                this.statutsDialog = true; // Maintenir la boîte de dialogue ouverte
            }
        );
    } else {
        // Sinon, créer un nouveau produit
        this.statutService.save(statutData).subscribe(
            () => {
                this.statutsDialog = false;
                this.getAllStatuts(); // Rafraîchir la liste des produits
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Statut ajouté avec succès.',
                    life: 3000,
                });
                this.statut = {}; // Réinitialiser l'objet statut
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Erreur lors de l\'ajout du Statut.',
                    life: 3000,
                });
                console.error('Erreur d\'ajout :', error);
                this.statutsDialog = true; // Maintenir la boîte de dialogue ouverte
            }
        );
    }
}


  // Exporter les données du tableau en PDF
  exportPDF(): void {
    if (this.dt) {
      const columns = this.cols.map((col) => col.header);
      const data = this.statuts.map((row) =>
        this.cols.map((col) => (row[col.field as keyof StatutDto] || '').toString())
      );

      const doc = new jsPDF();
      autoTable(doc, {
        head: [columns],
        body: data,
      });
      doc.save('Statut.pdf');
    }
  }

  // Éditer un statut existant
  edit(statut: StatutDto): void {
    // Vérifier si l'ID du statut est défini
    if (statut.id !== undefined) {
      // Utiliser l'ID du paramètre pour appeler le service
      this.statutService.getOneById(statut.id).subscribe(
        (statutDetails) => {
          // Mettre à jour this.statut avec les détails récupérés
          this.statut = { ...statutDetails };
          this.buildForm();
          this.statutsDialog = true;
        },
        () => {
          // Gestion des erreurs de l'appel au service
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Impossible de charger les détails du Statut.',
            life: 3000,
          });
        }
      );
    } else {
      // Si l'ID est undefined, afficher un avertissement
      this.messageService.add({
        severity: 'warn',
        summary: 'Avertissement',
        detail: 'Le Statut sélectionné est invalide.',
        life: 3000,
      });
    }
  }


  // Charger tous les employe
  private getAllStatuts(): void {
    this.loading = true;
    this.statutService.findAll().subscribe(
      (result) => {
        this.statuts = result;
        this.loading = false;
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors du chargement des Status.',
          life: 3000,
        });
        this.loading = false;
      }
    );
  }
}
