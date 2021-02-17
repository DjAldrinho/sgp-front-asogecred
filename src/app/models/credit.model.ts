import { Transaction } from "./transaction.model";

export class Credit {
  constructor(
    public id:               number,
    public code:             string,
    public payroll_id:       number,
    public credit_type_id:   number,
    public debtor_id:        number,
    public first_co_debtor:  number,
    public second_co_debtor: number,
    public start_date:       Date,
    public refinanced:       boolean,
    public capital_value:    string,
    public transport_value:  string,
    public other_value:      string,
    public interest:         string,
    public commission:       string,
    public fee:              number,
    public created_at:       Date,
    public updated_at:       Date,
    public adviser_id:       number,
    public refinanced_id:    number,
    public status:           string,
    public account_id:       number,
    public liquidate:        Liquidate,
    public transactions:     Transaction[],
  ){}
}

export class Liquidate {
  constructor(
    public total_credit:   string,
    public total_interest: string,
    public total_capital:  string,
    public fees:           Fee[],
  ){}
}

export class Fee {
  constructor(
    public number:          number,
    public start_date:      Date,
    public fee_value:       string,
    public interest_value:  string,
    public capital_balance: string,
    public capital_fee: string,
  ){}
}
