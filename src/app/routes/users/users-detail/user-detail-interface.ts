export interface UserData {
  payment_current_month?: boolean;
  user_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: number;
  sex?: number;
  consume_period?: number;
  days_remains?: number;
  is_active?: boolean;
  renewal?: number;
  points?: number;
  code?: string;
  left_points?: number;
  rigth_points?: number;
  last_trip?: LastTrip[];
  range?: string;
  node?: number;
  referidos?: number;
  referidos_activos?: number;
  total_red?: number;
  total_red_activos?: number;
  referidos_izquierda?: number;
  referidos_derecha?: number;
  referidos_activos_izquierda?: number;
  referidos_activos_derecha?: number;
  ciclos?: number;
  direct_users_g0?: number;
  direct_users_g1?: number;
  direct_users_g2?: number;
  direct_users_g3?: number;
  direct_users_g4?: number;
  direct_users_g5?: number;
  direct_users_g6?: number;
  direct_users_g7?: number;
  direct_users_g8?: number;
  direct_users_g9?: number;
  direct_users_g10?: number;
  getgo_money?: number;
  trip_month_current?: number;
}

export interface LastTrip {
  address_origin?: string;
  address_delivery?: string;
  amount?: number;
  type_payment?: number;
}
