import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {AccountForm} from '../interfaces/account-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:variable-name
  getAccounts(page?: number, per_page?: number, all: boolean = false): Observable<{ accounts: any[], total: number }> {

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
          const accounts: any[] = resp.accounts.data;
          const total: number = resp.accounts.total;
          return {accounts, total};
        })
      );
  }

  createAccount(account: AccountForm): Observable<any> {
    return this.http.post(`${base_url}/accounts/create`, account);
  }
}
