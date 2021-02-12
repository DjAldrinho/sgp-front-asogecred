export class User {
  constructor(
    public id: number,
    // tslint:disable-next-line:variable-name
    public document_type: string,
    // tslint:disable-next-line:variable-name
    public document_number: string,
    public name: string,
    public email: string,
    // tslint:disable-next-line:variable-name
    public email_verified_at: any,
    // tslint:disable-next-line:variable-name
    public is_administrator: boolean,
  ) {
  }
}
