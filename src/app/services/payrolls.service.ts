import {Injectable} from '@angular/core';
import {Payroll} from '../models/payroll.model';
import {Observable, pipe} from 'rxjs';
import {BaseService} from './base.service';
import {PayrollInterface} from '../interfaces/payroll.interface';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PayrollsService {
  private section = 'payrolls';

  constructor(private baseService: BaseService) {
  }

  // tslint:disable-next-line:variable-name
  getPayrolls(page?: number, per_page?: number): Observable<{ payrolls: Payroll[], total: number }> {
    return this.baseService.get(this.section, page, per_page)
      .pipe(
        map((response: any) => {
          const payrolls: Payroll[] = response.items;
          const total: number = response.total;
          return {payrolls, total};
        })
      );

  }

  createPayroll({name, status}: PayrollInterface): Observable<any> {
    return this.baseService.create(this.section, {name, status});
  }

  updatePayroll({id, name, status}: PayrollInterface): Observable<any> {
    return this.baseService.update(this.section, {name, status}, id);
  }

  deletePayroll({id}: Payroll): Observable<any> {
    return this.baseService.delete(this.section, id);
  }

}
