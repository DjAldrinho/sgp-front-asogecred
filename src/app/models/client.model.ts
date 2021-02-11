export class Client {
    constructor(
        public id:              number,
        public document_type:   string,
        public document_number: string,
        public name:            string,
        public phone:           string,
        public email:           string,
        public sign:            string,
        public client_type:     string,
        public created_at:      Date,
        public updated_at:      Date,
        public sign_url:        string,
        public position:        string,
        public salary:          string,
        public bonding:        string,
        public start_date:        string,
    ){}
}