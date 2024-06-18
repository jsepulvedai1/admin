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
  document_sex_validator?: null | string;
  type_vehicle: number;
  accept_trip_type_1: boolean;
  accept_trip_type_2: boolean;
  accept_trip_type_3: boolean;
  accept_trip_type_4: boolean;
}

export interface DocumentEnum {
  [key: string]: string;
}
