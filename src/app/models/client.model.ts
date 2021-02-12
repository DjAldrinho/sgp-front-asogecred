export class Client {
  constructor(
    public id: number,
    // tslint:disable-next-line:variable-name
    public document_type: string,
    // tslint:disable-next-line:variable-name
    public document_number: string,
    public name: string,
    public phone: string,
    public email: string,
    public sign: string,
    // tslint:disable-next-line:variable-name
    public client_type: string,
    // tslint:disable-next-line:variable-name
    public created_at: Date,
    // tslint:disable-next-line:variable-name
    public updated_at: Date,
    // tslint:disable-next-line:variable-name
    public sign_url: string,
    public position: string,
    public salary: string,
    public bonding: string,
    // tslint:disable-next-line:variable-name
    public start_date: string,
  ) {
  }
}
