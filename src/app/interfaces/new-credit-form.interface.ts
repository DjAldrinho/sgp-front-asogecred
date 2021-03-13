export interface NewCreditForm {
    payroll_id: number,
    account_id: number,
    adviser_id: number,
    fee: number,
    commission: number,
    interest: number,
    other_value: number,
    transport_value: number,
    capital_value: number,
    second_co_debtor: number,
    first_co_debtor: number,
    debtor_id: number,
    credit_type_id: number,
    start_date: string
}