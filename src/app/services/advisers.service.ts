import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {Adviser} from '../models/adviser.model';
import {AdviserInterface} from '../interfaces/adviser.interface';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AdvisersService {
  private section = 'advisers';

  constructor(private baseService: BaseService, private http: HttpClient) {
  }

  // tslint:disable-next-line:variable-name
  getAdvisers(page?: number, per_page?: number, query?: string, all?: boolean): Observable<{ advisers: Adviser[], total: number }> {
    return this.baseService.get(this.section, page, per_page, all, query)
      .pipe(
        map((response: any) => {
          const advisers: Adviser[] = response.items;
          const total: number = response.total;
          return {advisers, total};
        })
      );
  }

  getAdviserById(id: number): Observable<Adviser> {
    return this.http.get(`${base_url}/advisers/info/${id}`)
      .pipe(
        map((resp: any) => {
          const adviser: Adviser = resp.adviser;
          return adviser;
        }),
      );
  }

  createAdviser({name, phone}: AdviserInterface): Observable<any> {
    return this.baseService.create(this.section, {name, phone});
  }

  updateAdviser({name, phone}: AdviserInterface, id: number): Observable<any> {
    return this.baseService.update(this.section, {name, phone}, id);
  }

  deleteAdviser({id}: Adviser): Observable<any> {
    return this.baseService.delete(this.section, id);
  }
}
