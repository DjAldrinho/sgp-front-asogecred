import { Account } from "./account.model";
import { Adviser } from "./adviser.model";
import { Client } from "./client.model";
import { CreditType } from "./credit-type.model";
import { Payroll } from "./payroll.model";
import { Transaction } from "./transaction.model";

export class Credit {
  constructor(
    public id:               number,
    public code:             string,
    public payroll_id:       number,
    public credit_type_id:   number,
    public debtor_id:        number,
    public first_co_debtor:  Client,
    public second_co_debtor: Client,
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
    public debtor:           Client,
    public adviser:          Adviser,
    public credit_type:      CreditType,
    public payment:          number,
    public account:          Account,
    public payroll:          Payroll,
    public totals :          Totals,
    public commentary:       string,
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

export class Totals {
  constructor(
    public total_deposit  : number,
    public total_retires  : number,
  ){}
}
