import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Credit} from '../models/credit.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CreditsService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:variable-name
  getCredits(page?: number, per_page?: number): Observable<{ credits: Credit[], total: number }> {

    if (page == null) {
      page = 1;
    }
    if (per_page == null) {
      per_page = 10;
    }

    const url = `${base_url}/credits/all?page=${page}&per_page=${per_page}`;
    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          const credits: Credit[] = resp.transactions.data;
          const total: number = resp.transactions.total;
          return {credits, total};
        })
      );
  }
}
