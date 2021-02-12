export class Transaction {
    constructor(
        public id:                  number,
        public origin:              string,
        public code:                string,
        public value:               string,
        public supplier_id:         number,
        public account_id:          number,
        public type_transaction_id: number,
        public commentary:          string,
        public created_at:          Date,
        public updated_at:          Date,
        public user_id:             number,
        public credit_id:           number,
    ){}
}