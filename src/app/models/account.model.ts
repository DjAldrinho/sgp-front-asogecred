export class Account {
    constructor(
        public id:             number,
        public name:           string,
        public account_number: string,
        public value:          string,
        public old_value:      string,
        public status:         string,
        public created_at:     Date,
        public updated_at:     Date,
    ){}
}