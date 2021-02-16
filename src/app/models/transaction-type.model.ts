import {TransactionTypeInterface} from '../interfaces/transaction-type.interface';

export class TransactionType implements TransactionTypeInterface {
  constructor(
    public id: number,
    public name: string,
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
