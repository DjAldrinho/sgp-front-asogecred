import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Credit, Liquidate} from '../models/credit.model';
import { UserService } from './user.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CreditsService {

  constructor(private http: HttpClient,
    private userService: UserService) {
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
          const credits: Credit[] = resp.credits.data;
          const total: number = resp.credits.total;
          return {credits, total};
        })
      );
  }

  getLiquidate(): Observable<Liquidate> {
    const body = {
      "interest": "3",
      "other_value": "50000",
      "transport_value": "20000",
      "capital_value": "100000",
      "fee": "12",
      "start_date": "2021/02/15"
    };
    return this.http.post(`${base_url}/credits/liquidate`, body)
      .pipe(
        map((resp: any) => {
          const liquidate: Liquidate = resp;
          return liquidate;
        })
      );
  }

}
