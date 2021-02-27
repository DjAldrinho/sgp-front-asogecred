import {AdviserInterface} from '../interfaces/adviser.interface';

export class Adviser implements AdviserInterface {
  constructor(
    public id: number,
    public name: string,
    public phone: string,
    public status: string,
    public created_at?: Date,
    public updated_at?: Date,
    public deleted_at?: any,
    public total_commissions?: string
  ) {
  }
}
