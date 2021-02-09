import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient,
    private router: Router) { }


  getClients(page?: number, per_page?: number): Observable<{clients: Client[], total:number}> {
    
    if (page == null) {
      page = 1;
    }
    if (per_page == null) {
      per_page = 10
    }
    
    const url = `${base_url}/clients/all?page=${page}&per_page=${per_page}`;
    return this.http.get(url)
    .pipe(
      map((resp: any) => {
        const clients: Client[] = resp.clients.data;
        const total: number = resp.clients.total;
        return {clients, total};
      })
    );
  }

  deleteClient(client: Client) {
    const url = `${base_url}/clients/delete/${client.id}`;
    return this.http.delete(url);
  }
}