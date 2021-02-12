export interface LawyerInterface {
  id: number;
  document_type: string;
  document_number: string;
  name: string;
  phone: string;
  email: string;
  professional_card: string;
  status: string;
  remember_token?: any;
  created_at?: Date;
  updated_at?: Date;
  professional_card_url?: string;
}
