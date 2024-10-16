export interface userDetail {
  pk?: number;
  email?: string;
  avatar?: string;
  first_name?: string;
  last_name?: string;
  sex?: number;
  join_date?: string;
  type_user?: number;
  ref_code?: string;
  phone?: number;
  validated_phone?: boolean;
  is_active?: boolean;
  is_staff?: boolean;
  antecedentes_front?: null | string;
  antecedentes_back?: null | string;
  is_validated?: number;
  payment_default?: number;
  card_default?: null | string;
  rank_driver?: number;
  rank_user?: number;
  getgo_money?: number;
  count_trip_complete?: number;
  count_trip_current_month?: number;
  document_sex_validator?: any;
  id_photo?: string;
  id_number?: string;
  is_validated_user?: number | string;
}

export interface DocumentEnum {
  [key: string]: string;
}
