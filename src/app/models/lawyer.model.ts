import {LawyerInterface} from '../interfaces/lawyer.interface';

export class Lawyer implements LawyerInterface {
  constructor(
    public id: number,
    // tslint:disable-next-line:variable-name
    public document_type: string,
    // tslint:disable-next-line:variable-name
    public document_number: string,
    public name: string,
    public phone: string,
    public email: string,
    // tslint:disable-next-line:variable-name
    public professional_card: string,
    public status: string,
    // tslint:disable-next-line:variable-name
    public remember_token?: any,
    // tslint:disable-next-line:variable-name
    public created_at?: Date,
    // tslint:disable-next-line:variable-name
    public updated_at?: Date,
    // tslint:disable-next-line:variable-name
    public professional_card_url?: string
  ) {
  }
}
