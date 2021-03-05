import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Credit} from '../models/credit.model';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Transaction} from '../models/transaction.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private section = 'report';

  constructor(private http: HttpClient) {
  }

  credits(type: string, page?: number, perPage?: number,
          accountId?: number, clientId?: number,
          firstCoDebtorId?: number, secondCoDebtorId?: number,
          adviserId?: number, all: boolean = false,
          status?: string, date?: string, refinanced?: boolean): string {

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
    let dateUrl = '';
    if (date != null) {
      dateUrl = `&${date}`;
    }
    let refinancedUrl = '';
    if (refinanced != null) {
      refinancedUrl = `&refinanced=${refinanced}`;
    }

    return all
      ? `${base_url}/${this.section}/credits?all=${true}&type=${type}${account}${client}${firstCoDebtor}${secondCoDebtor}${adviser}${statusUrl}${dateUrl}${refinancedUrl}`
      // tslint:disable-next-line:max-line-length
      : `${base_url}/${this.section}/credits?page=${page}&per_page=${perPage}&type=${type}${account}${client}${firstCoDebtor}${secondCoDebtor}${adviser}${statusUrl}${dateUrl}${refinancedUrl}`;
  }

  transactions(
    type: string, page?: number, perPage?: number,
    accountId?: number, creditId?: number, origin?: string,
    clientId?: number, userId?: number, processId?: number,
    adviserId?: number, date?: string, transactionType?: string): string {

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
    let credit = '';
    if (creditId != null) {
      credit = `&credit=${creditId}`;
    }
    let origins = '';
    if (origin != null) {
      origins = `&origin=${origin}`;
    }
    let client = '';
    if (clientId != null) {
      client = `&client=${clientId}`;
    }
    let user = '';
    if (userId != null) {
      user = `&user=${userId}`;
    }
    let process = '';
    if (processId != null) {
      process = `&process=${processId}`;
    }
    let adviser = '';
    if (adviserId != null) {
      adviser = `&adviser=${adviserId}`;
    }
    let dateUrl = '';
    if (date != null) {
      dateUrl = `&${date}`;
    }
    let transactionTypeUrl = '';
    if (transactionType != null) {
      transactionTypeUrl = `&type_transaction=${transactionType}`;
    }
    return `${base_url}/${this.section}/transactions?page=${page}&per_page=${perPage}&type=${type}${account}${credit}${origins}${client}${user}${process}${adviser}${dateUrl}${transactionTypeUrl}`;
  }
}
