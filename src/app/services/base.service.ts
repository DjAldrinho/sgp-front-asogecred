import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private base_url = environment.base_url;

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:variable-name
  get(section: string, page?: number, per_page?: number, all: boolean = false, query?: string): Observable<any> {
    if (page == null) {
      page = 1;
    }
    if (per_page == null) {
      per_page = 10;
    }

    let search = '';

    if (query != null) {
      search = `&search=${query}`;
    }

    const url = all ? `${this.base_url}/${section}/all` : `${this.base_url}/${section}/all?page=${page}&per_page=${per_page}${search}`;
    return this.http.get(url).pipe(
      map(response => {
        section = section === 'type-transaction' || section === 'credit-types' ? 'types' : section;
        const items = response[section].data;
        const total = response[section].total;
        return {items, total};
      })
    );
  }

  create(section: string, data: object): Observable<any> {
    return this.http.post(`${this.base_url}/${section}/create`, data);
  }

  update(section: string, body: object, id: number): Observable<any> {
    return this.http.patch(`${this.base_url}/${section}/update/${id}`, body);
  }

  delete(section: string, id: number): Observable<any> {
    const url = `${this.base_url}/${section}/delete/${id}`;
    return this.http.delete(url);
  }

  getPagination(url: string): Observable<any> {
    return this.http.get(url);
  }

}
