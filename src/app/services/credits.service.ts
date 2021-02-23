import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import { AddCreditCommentaryForm } from '../interfaces/add-credit-commentary-form-interface';
import { DepositForm } from '../interfaces/deposit-form.interface';
import { NewCreditForm } from '../interfaces/new-credit-form.interface';
import { RefinanceCreditForm } from '../interfaces/refinance-credit-form.interface';
import {Credit, Liquidate} from '../models/credit.model';
import { BaseService } from './base.service';
import { UserService } from './user.service';

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

  getCreditById(id: number) : Observable<Credit> {
    return this.http.get(`${base_url}/credits/info/${id}`)
    .pipe(
      map((resp: any) => {
        const credit: Credit = resp.credit;
        return credit;
      }),
    );
  }

  getLiquidate(capital_value: number,interest: number, fee:number, start_date: string, other_value?:number, transport_value?:number): Observable<Liquidate> {
    const body = {
      interest,
      "other_value": other_value == null ? 0 : other_value,
      "transport_value": transport_value == null ? 0 : transport_value,
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

  approveCredit(idCredit: number, commentary : string, file: File): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.userService.token}`,
      'Content-Type': 'multipart/form-data'
    });
    const formData: FormData = new FormData();
    formData.append('files', file);
    formData.append('credit_id', `${idCredit}`);
    formData.append('commentary', commentary);
    return this.http.post(`${base_url}/credits/approve`, formData, {headers});
  }

  depositCredit(deposit: DepositForm): Observable<any> {
    return this.http.post(`${base_url}/credits/deposit`, deposit);
  }

  addCommentary(commentary: AddCreditCommentaryForm): Observable<any>{
    return this.http.post(`${base_url}/credits/add-commentary`, commentary);
  }

  refinanceCredit(refinance: RefinanceCreditForm): Observable<any>{
    return this.http.post(`${base_url}/credits/refinance`, refinance);
  }

}
