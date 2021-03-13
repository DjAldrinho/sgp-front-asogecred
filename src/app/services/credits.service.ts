import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {AddCreditCommentaryForm} from '../interfaces/add-credit-commentary-form-interface';
import {DepositForm} from '../interfaces/deposit-form.interface';
import {NewCreditForm} from '../interfaces/new-credit-form.interface';
import {RefinanceCreditForm} from '../interfaces/refinance-credit-form.interface';
import {Credit, Liquidate} from '../models/credit.model';
import {BaseService} from './base.service';
import {UserService} from './user.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CreditsService {

  private section = 'credits';

  constructor(private http: HttpClient,
              private baseService: BaseService,
              private userService: UserService) {
  }

  getCredits(page?: number, perPage?: number,
             accountId?: number, clientId?: number,
             firstCoDebtorId?: number, secondCoDebtorId?: number,
             adviserId?: number, all: boolean = false,
             status?: string, dateInitial?: string,
             dateFinal?: string, refinanced?: boolean): Observable<{ credits: Credit[], total: number }> {

    if (page == null) {
      page = 1;
    }
    if (perPage == null) {
      perPage = 10;
    }
    let account = '';
    if (accountId != null) {
      account = `&account=${accountId}`;
    }
    let client = '';
    if (clientId != null) {
      client = `&client=${clientId}`;
    }
    let firstCoDebtor = '';
    if (firstCoDebtorId != null) {
      firstCoDebtor = `&first_co_debtor=${firstCoDebtorId}`;
    }
    let secondCoDebtor = '';
    if (secondCoDebtorId != null) {
      secondCoDebtor = `&second_co_debtor=${secondCoDebtorId}`;
    }
    let adviser = '';
    if (adviserId != null) {
      adviser = `&adviser=${adviserId}`;
    }
    let statusUrl = '';
    if (status != null) {
      statusUrl = `&status=${status}`;
    }
    let dateInitialUrl = '';
    if (dateInitial != null) {
      dateInitialUrl = `&start_date=${dateInitial}`;
    }
    let dateFinalUrl = '';
    if (dateFinal != null) {
      dateFinalUrl = `&end_date=${dateFinal}`;
    }
    let refinancedUrl = '';
    if (refinanced != null) {
      refinancedUrl = `&refinanced=${refinanced}`;
    }

    const url = all
      ? `${base_url}/credits/all?${account}${client}${firstCoDebtor}${secondCoDebtor}${adviser}${statusUrl}${dateInitialUrl}${dateFinalUrl}${refinancedUrl}`
      // tslint:disable-next-line:max-line-length
      : `${base_url}/credits/all?page=${page}&per_page=${perPage}${account}${client}${firstCoDebtor}${secondCoDebtor}${adviser}${statusUrl}${dateInitialUrl}${dateFinalUrl}${refinancedUrl}`;
    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          const credits: Credit[] = resp.credits.data;
          const total: number = resp.credits.total;
          return {credits, total};
        })
      );
  }


  getCreditsExpired(page?: number, perPage?: number,
                    accountId?: number, clientId?: number,
                    firstCoDebtorId?: number, secondCoDebtorId?: number,
                    dateInitial?: string, dateFinal?: string, all: boolean = false): Observable<{ credits: Credit[], total: number }> {

    if (page == null) {
      page = 1;
    }
    if (perPage == null) {
      perPage = 10;
    }
    let account = '';
    if (accountId != null) {
      account = `&account=${accountId}`;
    }
    let client = '';
    if (clientId != null) {
      client = `&client=${clientId}`;
    }
    let firstCoDebtor = '';
    if (firstCoDebtorId != null) {
      firstCoDebtor = `&first_co_debtor=${firstCoDebtorId}`;
    }
    let secondCoDebtor = '';
    if (secondCoDebtorId != null) {
      secondCoDebtor = `&second_co_debtor=${secondCoDebtorId}`;
    }
    let dateInitialUrl = '';
    if (dateInitial != null) {
      dateInitialUrl = `&start_date=${dateInitial}`;
    }
    let dateFinalUrl = '';
    if (dateFinal != null) {
      dateFinalUrl = `&end_date=${dateFinal}`;
    }

    const url = all
      ? `${base_url}/credits/expired?all=${true}${account}${client}${firstCoDebtor}${secondCoDebtor}${dateInitialUrl}${dateFinalUrl}`
      : `${base_url}/credits/expired?page=${page}&per_page=${perPage}${account}${client}${firstCoDebtor}${secondCoDebtor}${dateInitialUrl}${dateFinalUrl}`;
    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          const credits: Credit[] = resp.data;
          const total: number = resp.total;
          return {credits, total};
        })
      );
  }

  getCreditById(id: number): Observable<Credit> {
    return this.http.get(`${base_url}/credits/info/${id}`)
      .pipe(
        map((resp: any) => {
          const credit: Credit = resp.credit;
          return credit;
        }),
      );
  }

  // tslint:disable-next-line:variable-name
  getLiquidate(capital_value: number, interest: number,
               // tslint:disable-next-line:variable-name
               fee: number, start_date: string, other_value?: number,
               // tslint:disable-next-line:variable-name
               transport_value?: number): Observable<Liquidate> {
    const body = {
      interest,
      other_value: other_value == null ? 0 : other_value,
      transport_value: transport_value == null ? 0 : transport_value,
      capital_value,
      fee,
      start_date
    };
    return this.http.post(`${base_url}/credits/liquidate`, body)
      .pipe(
        map((resp: any) => {
          const liquidate: Liquidate = resp.liquidate;
          return liquidate;
        })
      );
  }

  createCredit(newCreditForm: NewCreditForm): Observable<any> {
    return this.baseService.create(this.section, newCreditForm);
  }

  rejectCredit(idCredit: number): Observable<any> {
    return this.http.patch(`${base_url}/credits/cancel/${idCredit}`, {});
  }

  approveCredit(idCredit: number, commentary: string, files: File[]): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.userService.token}`,
      'Content-Type': 'multipart/form-data'
    });
    const formData: FormData = new FormData();
    for (let x = 0; x < files.length; x++) {
      formData.append(`files[${x}]`, files[x]);
    }
    formData.append('credit_id', `${idCredit}`);
    formData.append('commentary', commentary);
    return this.http.post(`${base_url}/credits/approve`, formData, {headers});
  }

  depositCredit(deposit: DepositForm): Observable<any> {
    return this.http.post(`${base_url}/credits/deposit`, deposit);
  }

  // tslint:disable-next-line:typedef
  addCommentary(commentary: AddCreditCommentaryForm) {
    return this.http.post(`${base_url}/credits/add-commentary`, commentary);
  }

  refinanceCredit(refinance: RefinanceCreditForm, files: File[]): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.userService.token}`,
      'Content-Type': 'multipart/form-data'
    });
    const formData: FormData = new FormData();
    for (let x = 0; x < files.length; x++) {
      formData.append(`files[${x}]`, files[x]);
    }
    formData.append('credit_id', `${refinance.credit_id}`);
    formData.append('capital_value', `${refinance.capital_value}`);
    formData.append('fee', `${refinance.fee}`);
    formData.append('transport_value', `${refinance.transport_value}`);
    return this.http.post(`${base_url}/credits/refinance`, formData, {headers});
  }

  urlReportCredit(idCredit: number): string {
    return `${base_url}/report/creditReport/${idCredit}`;
  }

  urlPeaceSaveCredit(idCredit: number): string {
    return `${base_url}/report/peace/${idCredit}`;
  }

}
