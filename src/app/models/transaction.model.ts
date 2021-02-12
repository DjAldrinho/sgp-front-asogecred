export class Transaction {
  constructor(
    public id: number,
    public origin: string,
    public code: string,
    public value: string,
    // tslint:disable-next-line:variable-name
    public supplier_id: number,
    // tslint:disable-next-line:variable-name
    public account_id: number,
    // tslint:disable-next-line:variable-name
    public type_transaction_id: number,
    public commentary: string,
    // tslint:disable-next-line:variable-name
    public created_at: Date,
    // tslint:disable-next-line:variable-name
    public updated_at: Date,
    // tslint:disable-next-line:variable-name
    public user_id: number,
    // tslint:disable-next-line:variable-name
    public credit_id: number,
  ) {
  }
}
