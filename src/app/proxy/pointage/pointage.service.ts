import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import type { PointageDto } from './models';
import { environment } from '../../../environments/environment';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PointageService {
  apiName = 'pointage';
  private api_host: string = environment.api_host + this.apiName;
  myToken = sessionStorage.getItem("token");

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + this.myToken
    })
  };

  constructor(private readonly httpClient: HttpClient) { }


  // Récupérer toutes les produits
  findAll() {
    return this.httpClient.get<PointageDto[]>(this.api_host, this.httpOptions);
  }

findAllByAnnee(annee: string) {
    const new_api_host = this.routerParam(this.api_host+'/findByAnnee', annee.toString());
    return this.httpClient.get<PointageDto[]>(new_api_host, this.httpOptions);
  }



  // Sauvegarder un nouveau produit
  save(item: PointageDto) {
    return this.httpClient.post(this.api_host, item, this.httpOptions);
  }

  // Supprimer un produit par ID
  delete(id: number) {
    const new_api_host = this.routerParam(this.api_host, id.toString());
    return this.httpClient.delete(new_api_host, this.httpOptions);
  }

  // Mettre à jour un pointage  par ID
  update(id: number, item: PointageDto) {
    const new_api_host = this.routerParam(this.api_host, id.toString());
    return this.httpClient.put<PointageDto>(new_api_host, item, this.httpOptions);
  }

  // Récupérer un produit par ID
  getOneById(id: number) {
      const new_api_host = this.routerParam(this.api_host, id.toString());
      return this.httpClient.get<PointageDto>(new_api_host, this.httpOptions);
    }

  // Méthode spécifique pour mettre à jour le statut d'un produits
  updateStatus(id: number, status: string) {
    const new_api_host = this.routerParam(this.api_host, id.toString()) + '/status';
    return this.httpClient.put<{ status: string }>(
      new_api_host,
      { status },
      this.httpOptions
    );
  }

  // Utilitaire pour ajouter des paramètres à l'URL
  routerParam(host: string, param: string) {
    return `${host}/${param}`;
  }
}
