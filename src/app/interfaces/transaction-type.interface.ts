export interface TransactionTypeInterface {
  id: number;
  name: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: any;
}
