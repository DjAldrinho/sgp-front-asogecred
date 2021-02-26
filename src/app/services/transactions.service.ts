import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Transaction} from '../models/transaction.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:variable-name
  getTransactions(page?: number, per_page?: number, account_id?: number, idCredit?: number, origin?: string, idProcess?: number): Observable<{ transactions: Transaction[], total: number }> {

    if (page == null) {
      page = 1;
    }
    if (per_page == null) {
      per_page = 10;
    }

    let account = "";
    if(account_id != null){
      account = `&account=${account_id}`;
    }

    let credit = "";
    if(idCredit != null){
      credit = `&credit=${idCredit}`;
    }

    let origins = "";
    if(origin != null){
      origins = `&origin=${origin}`;
    }

    let processUrl = "";
    if(idProcess != null){
      processUrl = `&process=${idProcess}`;
    }

    const url = `${base_url}/transactions/all?page=${page}&per_page=${per_page}${account}${credit}${origins}${processUrl}`;
    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          const transactions: Transaction[] = resp.transactions.data;
          const total: number = resp.transactions.total;
          return {transactions, total};
        })
      );
  }
}
