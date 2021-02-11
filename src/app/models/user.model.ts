export class User {
    constructor(
        public id:                number,
        public document_type:     string,
        public document_number:   string,
        public name:              string,
        public email:             string,
        public email_verified_at: any,
        public is_administrator:  boolean,
    ){}
}