import {Credit} from './credit.model';
import {Lawyer} from './lawyer.model';

export class Process {
  constructor(
    public id: number,
    public lawyer_id: number,
    public credit_id: number,
    public court: string,
    public demand_value: string,
    public fees_value: string,
    public payment: string,
    public created_at: Date,
    public updated_at: Date,
    public end_date: Date,
    public code: string,
    public status: string,
    public credit: Credit,
    public lawyer: Lawyer
  ) {
  }
}
