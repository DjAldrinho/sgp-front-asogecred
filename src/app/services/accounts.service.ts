import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {AccountForm} from '../interfaces/account-form.interface';
import {Account} from '../models/account.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:variable-name
  getAccounts(page?: number, per_page?: number, all: boolean = false): Observable<{ accounts: Account[], total: number }> {

    let url: string;
    if (page == null) {
      page = 1;
    }
    if (per_page == null) {
      per_page = 10;
    }

    url = all ? `${base_url}/accounts/all` : `${base_url}/accounts/all?page=${page}&per_page=${per_page}`;

    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          const accounts: Account[] = resp.accounts.data;
          const total: number = resp.accounts.total;
          return {accounts, total};
        })
      );
  }

  getAccountById(id: number) : Observable<Account> {
    return this.http.get(`${base_url}/accounts/get/${id}`)
    .pipe(
      map((resp: any) => {
        const account: Account = resp.account;
        return account;
      }),
    );
  }

  createAccount(account: AccountForm): Observable<any> {
    return this.http.post(`${base_url}/accounts/create`, account);
  }

  updateAccount(account: AccountForm, id: number): Observable<any> {
    const body = {
      name: account.name,
      status: account.status
    };
    return this.http.patch(`${base_url}/accounts/update/${id}`, body);
  }


  deleteAccount(account: Account): Observable<any> {
    const url = `${base_url}/accounts/delete/${account.id}`;
    return this.http.delete(url);
  }
}
