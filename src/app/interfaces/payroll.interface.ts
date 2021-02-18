export interface PayrollInterface {
  id: number;
  name: string;
  value: number;
  status: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: any;
}
