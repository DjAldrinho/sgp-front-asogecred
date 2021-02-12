import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AccountForm } from '../interfaces/account-form.interface';
import { Account } from '../models/account.model';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  getAccounts(page?: number, per_page?: number, all: boolean = false): Observable<{accounts: Account[], total:number}>{

    let url = "";

    if(all){
      url = `${base_url}/accounts/all`;
    }else{
      url = `${base_url}/accounts/all?page=${page}&per_page=${per_page}`;
    }

    if (page == null) {
      page = 1;
    }
    if (per_page == null) {
      per_page = 10
    }

    return this.http.get(url)
    .pipe(
      map((resp: any) => {
        const accounts: Account[] = resp.accounts.data;
        const total: number = resp.accounts.total;
        return {accounts, total};
      })
    );
  }

  createAccount(account: AccountForm): Observable<any> {
    return this.http.post(`${base_url}/accounts/create`, account);
  }


  deleteAccount(account: Account): Observable<any> {
    const url = `${base_url}/accounts/delete/${account.id}`;
    return this.http.delete(url);
  }
}
