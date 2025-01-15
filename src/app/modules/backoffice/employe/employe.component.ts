import { EmployeService } from './../../../proxy/employe/employe.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { EmployeDto } from '../../../proxy/employe';
@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.scss'
})
export class EmployeComponent implements OnInit {
  form!: FormGroup;
  employes: EmployeDto[] = [];
  employe: EmployeDto = {};
  produitsDialog = false;
  cols: { field: string; header: string }[] = [];
  loading = true;
  rowsPerPageOptions = [5, 10, 20];
  deleteproduitsDialog: boolean = false;


  @ViewChild('dt') dt?: Table;

  constructor(
    private employeService: EmployeService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initColumns();
    this.buildForm();
    this.getAllEmployes();
  }

  // Initialiser les colonnes pour le tableau
  private initColumns(): void {
    this.cols = [
      { field: 'matricule', header: 'Matricule' },
      { field: 'nom', header: 'Nom' },
      { field: 'prenom', header: 'Prenom' },
      { field: 'poste', header: 'Poste' },
      { field: 'departement', header: 'Departement' },
    ];
  }

// Supprimer  produits
  deleteProduits(employe: EmployeDto) {
    this.deleteproduitsDialog = true;
    this.employe = { ...employe };
}

// Confirme la suppresion

confirmDelete(): void {
  if (this.employe.id !== undefined) {
    this.deleteproduitsDialog = false;

    this.employeService.delete(this.employe.id).subscribe(
      () => {
        this.getAllEmployes(); // Rafraîchir la liste des produits
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Employe supprimé avec succès.',
          life: 3000,
        });
        this.employe = {}; // Réinitialiser l'objet produit
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
      detail: 'Aucun employe sélectionné pour suppression.',
      life: 3000,
    });
  }
}
 //
    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal(
          (event.target as HTMLInputElement).value,
          'contains'
      );
    }
  // Construire le formulaire
  private buildForm(): void {
    this.form = this.fb.group({
      matricule: [this.employe.matricule || '', Validators.required],
      nom: [this.employe.nom || '', Validators.required],
      prenom: [this.employe.prenom || '', Validators.required],
      poste: [this.employe.poste || '', Validators.required],
      departement: [this.employe.departement || '', Validators.required],

    });
  }

  // Ouvrir le formulaire pour créer un nouveau employe
  openNew(): void {
    this.employe = {};
    this.buildForm();
    this.produitsDialog = true;
  }

  hideDialog() {
    this.produitsDialog = false;
  }
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

    const employeData = this.form.value;

    if (this.employe.id) {
        // Si l'ID du produit existe, effectuer une mise à jour
        this.employeService.update(this.employe.id, employeData).subscribe(
            () => {
                this.produitsDialog = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Employe modifié avec succès.',
                    life: 3000,
                });
                this.employe = {}; // Réinitialiser l'objet produit
                this.getAllEmployes(); // Rafraîchir la liste des produits
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Erreur lors de la modification du Employé.',
                    life: 3000,
                });
                console.error('Erreur de mise à jour :', error);
                this.produitsDialog = true; // Maintenir la boîte de dialogue ouverte
            }
        );
    } else {
        // Sinon, créer un nouveau produit
        this.employeService.save(employeData).subscribe(
            () => {
                this.produitsDialog = false;
                this.getAllEmployes(); // Rafraîchir la liste des produits
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Employé ajouté avec succès.',
                    life: 3000,
                });
                this.employe = {}; // Réinitialiser l'objet produit
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Erreur lors de l\'ajout du Employé.',
                    life: 3000,
                });
                console.error('Erreur d\'ajout :', error);
                this.produitsDialog = true; // Maintenir la boîte de dialogue ouverte
            }
        );
    }
}


  // Exporter les données du tableau en PDF
  exportPDF(): void {
    if (this.dt) {
      const columns = this.cols.map((col) => col.header);
      const data = this.employes.map((row) =>
        this.cols.map((col) => (row[col.field as keyof EmployeDto] || '').toString())
      );

      const doc = new jsPDF();
      autoTable(doc, {
        head: [columns],
        body: data,
      });
      doc.save('produits.pdf');
    }
  }

  // Éditer un produit existant
  edit(employe: EmployeDto): void {
    if (employe.id !== undefined) {
      this.employeService.getOneById(employe.id).subscribe(
        (produitDetails) => {
          this.employe = { ...produitDetails };
          this.buildForm();
          this.produitsDialog = true;
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
    this.employeService.findAll().subscribe(
      (result) => {
        this.employes = result;
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
