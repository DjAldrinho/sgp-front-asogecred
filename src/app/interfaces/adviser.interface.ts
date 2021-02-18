export interface AdviserInterface {
  id: number;
  name: string;
  phone: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: any;
}
