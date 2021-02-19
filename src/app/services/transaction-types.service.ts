import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {TransactionType} from '../models/transaction-type.model';
import {TransactionTypeInterface} from '../interfaces/transaction-type.interface';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionTypeService {
  private section = 'type-transaction';

  constructor(private baseService: BaseService) {
  }

  // tslint:disable-next-line:variable-name
  getTransactionTypes(page?: number, per_page?: number, all: boolean = false): Observable<{ transactionTypes: TransactionType[], total: number }> {
    return this.baseService.get(this.section, page, per_page, all)
      .pipe(
        map((response) => {
          const transactionTypes: TransactionType[] = response.items;
          const total: number = response.total;
          return {transactionTypes, total};
        })
      );
  }

  createTransactionType({name}: TransactionTypeInterface): Observable<any> {
    return this.baseService.create(this.section, {name});
  }

  updateTransactionType({name}: TransactionTypeInterface, id: number): Observable<any> {
    return this.baseService.update(this.section, {name}, id);
  }

  deleteTransactionType({id}: TransactionType): Observable<any> {
    return this.baseService.delete(this.section, id);
  }
}
