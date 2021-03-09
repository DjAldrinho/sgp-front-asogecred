import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private section = 'report';

  constructor() {
  }

  credits(type: string, page?: number, perPage?: number,
          accountId?: number, clientId?: number,
          firstCoDebtorId?: number, secondCoDebtorId?: number,
          adviserId?: number, all: boolean = false, status?: string,
          dateInitial?: string, dateFinal?: string, refinanced?: boolean): string {

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

    return all
      ? `${base_url}/${this.section}/credits?all=${true}&type=${type}${account}${client}${firstCoDebtor}${secondCoDebtor}${adviser}${statusUrl}${dateInitialUrl}${dateFinalUrl}${refinancedUrl}`
      // tslint:disable-next-line:max-line-length
      : `${base_url}/${this.section}/credits?page=${page}&per_page=${perPage}&type=${type}${account}${client}${firstCoDebtor}${secondCoDebtor}${adviser}${statusUrl}${dateInitialUrl}${dateFinalUrl}${refinancedUrl}`;
  }

  transactions(
    type: string, page?: number, perPage?: number,
    accountId?: number, creditId?: number, origin?: string,
    clientId?: number, userId?: number, processId?: number, adviserId?: number,
    dateInitial?: string, dateFinal?: string, transactionType?: string): string {

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
    let dateInitialUrl = '';
    if (dateInitial != null) {
      dateInitialUrl = `&start_date=${dateInitial}`;
    }
    let dateFinalUrl = '';
    if (dateFinal != null) {
      dateFinalUrl = `&end_date=${dateFinal}`;
    }
    let transactionTypeUrl = '';
    if (transactionType != null) {
      transactionTypeUrl = `&type_transaction=${transactionType}`;
    }
    return `${base_url}/${this.section}/transactions?page=${page}&per_page=${perPage}&type=${type}${account}${credit}${origins}${client}${user}${process}${adviser}${dateInitialUrl}${dateFinalUrl}${transactionTypeUrl}`;
  }
}
