import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EmployeDto } from "./models";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class EmployeService{
    apiName = 'employe';
  private api_host: string = environment.api_host + this.apiName;
  myToken = sessionStorage.getItem("token");


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + this.myToken
    })
  };

  constructor(private readonly httpClient: HttpClient) { }


  // Récupérer toutes les actions
  findAll() {
    return this.httpClient.get<EmployeDto[]>(this.api_host, this.httpOptions);
  }

  // Sauvegarder une nouvelle actions
  save(item: EmployeDto) {
    return this.httpClient.post(this.api_host, item, this.httpOptions);
  }

  // Supprimer une actions par ID
  delete(id: number) {
    const new_api_host = this.routerParam(this.api_host, id.toString());
    return this.httpClient.delete(new_api_host, this.httpOptions);
  }
  // Mettre à jour une action par ID
  update(id: number, item: EmployeDto) {
    const new_api_host = this.routerParam(this.api_host, id.toString());
    return this.httpClient.put<EmployeDto>(new_api_host, item, this.httpOptions);
  }

// Récupérer une action pp ID
getOneById(id: number) {
    const new_api_host = this.routerParam(this.api_host, id.toString());
    return this.httpClient.get<EmployeDto>(new_api_host, this.httpOptions);
  }

  // Méthode spécifique pour mettre à jour le statut d'une ligne budgétaire
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
