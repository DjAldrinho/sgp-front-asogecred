export class Credit {

  constructor(
    public id: number,
    public code: string,
    // tslint:disable-next-line:variable-name
    public payroll_id: number,
    // tslint:disable-next-line:variable-name
    public credit_type_id: number,
    // tslint:disable-next-line:variable-name
    public debtor_id: number,
    // tslint:disable-next-line:variable-name
    public first_co_debtor: number,
    // tslint:disable-next-line:variable-name
    public second_co_debtor: number,
    // tslint:disable-next-line:variable-name
    public start_date: Date,
    public refinanced: boolean,
    // tslint:disable-next-line:variable-name
    public capital_value: string,
    // tslint:disable-next-line:variable-name
    public transport_value: string,
    // tslint:disable-next-line:variable-name
    public other_value: string,
    public interest: string,
    public commission: string,
    public fee: number,
    // tslint:disable-next-line:variable-name
    public created_at: Date,
    // tslint:disable-next-line:variable-name
    public updated_at: Date,
    // tslint:disable-next-line:variable-name
    public adviser_id: number,
    // tslint:disable-next-line:variable-name
    public refinanced_id: number,
    public status: string,
    // tslint:disable-next-line:variable-name
    public account_id: number,
  ) {
  }
}
