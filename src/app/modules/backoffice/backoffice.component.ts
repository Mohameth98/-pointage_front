import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../proxy/auth/Session.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrl: './backoffice.component.css'
})
export class BackofficeComponent implements OnInit {
  items!: MenuItem[];

  chartData: any;

  chartOptions: any;

constructor(
    private sessionService:SessionService
  ) {
}

  ngOnInit() {
      this.initChart();

      this.items = [
          { label: 'Add New', icon: 'pi pi-fw pi-plus' },
          { label: 'Remove', icon: 'pi pi-fw pi-minus' }
      ];
      // this.getStatistiques();
  }

  // getStatistiques() {
  //     //this.loadingColis = true;
  //     setTimeout(() => {
  //          //   this.loadingColis = false
  //          this.budgetService.statistiqueDcg(sessionStorage.getItem("annee")).subscribe(result=>{
  //             this.statistique=result;
  //         })
  //         },
  //         1000);

  // }

  initChart() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.chartData = {
          labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
          datasets: [
              {
                  label: 'Budget Globale',
                  data: [65, 59, 80, 81, 56, 55, 40],
                  fill: false,
                  backgroundColor: documentStyle.getPropertyValue('--blue-600'),
                  borderColor: documentStyle.getPropertyValue('--blue-600'),
                  tension: .4
              },
              {
                  label: 'Budget Execute',
                  data: [28, 48, 40, 19, 86, 27, 90],
                  fill: false,
                  backgroundColor: documentStyle.getPropertyValue('--white-800'),
                  borderColor: documentStyle.getPropertyValue('--white-800'),
                  tension: .4
              }
          ]
      };

      this.chartOptions = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              y: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };
  }


}


