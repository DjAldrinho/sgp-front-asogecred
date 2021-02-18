import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {ClientForm} from '../interfaces/client-form.interface';
import {Client} from '../models/client.model';
import {UserService} from './user.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  getClients(page?: number, per_page?: number, query?: string): Observable<{ clients: Client[], total: number }> {

    if (page == null) {
      page = 1;
    }
    if (per_page == null) {
      per_page = 10;
    }

    let search = ""

    if(query != null){
      search = `&search=${query}`
    }

    const url = `${base_url}/clients/all?page=${page}&per_page=${per_page}${search}`;
    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          const clients: Client[] = resp.clients.data;
          const total: number = resp.clients.total;
          return {clients, total};
        })
      );
  }

  createClient(client: ClientForm, file?: File): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.userService.token}`,
      'Content-Type': 'multipart/form-data'
    });
    const formData: FormData = new FormData();
    if (file) {
      formData.append('sign', file, file.name);
    }
    formData.append('name', client.name);
    // formData.append('email', client.email);
    // formData.append('phone', client.phone);
    formData.append('document_type', client.document_type);
    formData.append('document_number', client.document_number);
    formData.append('client_type', client.client_type);
    formData.append('position', client.position);
    formData.append('salary', client.salary);
    formData.append('start_date', client.start_date);
    formData.append('bonding', client.bonding);
    return this.http.post(`${base_url}/clients/create`, formData, {headers});
  }

  updateClient(client: ClientForm, id: number, file?: File): Observable<any> {

    const body = {
      salary: client.salary,
      position: client.position,
      bonding: client.bonding,
      client_type: client.client_type,
      start_date: client.start_date
    };

    return this.http.patch(`${base_url}/clients/update/${id}`, body);
  }


  deleteClient(client: Client): Observable<any> {
    const url = `${base_url}/clients/delete/${client.id}`;
    return this.http.delete(url);
  }
}
