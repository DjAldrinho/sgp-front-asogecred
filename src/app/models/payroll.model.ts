import {PayrollInterface} from '../interfaces/payroll.interface';

export class Payroll implements PayrollInterface {
  constructor(
    public id: number,
    public name: string,
    public value: number,
    public status: string,
    // tslint:disable-next-line:variable-name
    public created_at?: Date,
    // tslint:disable-next-line:variable-name
    public updated_at?: Date,
    // tslint:disable-next-line:variable-name
    public deleted_at?: any
  ) {
  }

}
