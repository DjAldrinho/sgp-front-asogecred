import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {CreditType} from '../models/credit-type.model';
import {CreditTypeInterface} from '../interfaces/credit-type.interface';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreditTypesService {
  private section = 'credit-types';

  constructor(private baseService: BaseService) {
  }

  // tslint:disable-next-line:variable-name
  getCreditTypes(page?: number, per_page?: number, all: boolean = false): Observable<{ creditTypes: CreditType[], total: number }> {
    return this.baseService.get(this.section, page, per_page, all)
      .pipe(
        map((response: any) => {
          const creditTypes: CreditType[] = response.items;
          const total: number = response.total;
          return {creditTypes, total};
        })
      );
  }

  createCreditType({name, value}: CreditTypeInterface): Observable<any> {
    return this.baseService.create(this.section, {name, value});
  }

  updateCreditType({name, value}: CreditTypeInterface, id: number): Observable<any> {
    return this.baseService.update(this.section, {name, value}, id);
  }

  deleteCreditType({id}: CreditType): Observable<any> {
    return this.baseService.delete(this.section, id);
  }
}
