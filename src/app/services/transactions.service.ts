import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  getTransactions(page?: number, per_page?: number): Observable<{transactions: any[], total:number}>{

    if (page == null) {
      page = 1;
    }
    if (per_page == null) {
      per_page = 10
    }
    
    const url = `${base_url}/transactions/all?page=${page}&per_page=${per_page}`;
    return this.http.get(url)
    .pipe(
      map((resp: any) => {
        const transactions: any[] = resp.transactions.data;
        const total: number = resp.transactions.total;
        return {transactions, total};
      })
    );
  }
}
