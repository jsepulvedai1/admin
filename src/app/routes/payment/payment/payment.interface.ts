export interface User {
  pk: number;
  email: string;
  avatar: string;
  id_photo: string;
  first_name: string;
  last_name: string;
  sex: number;
  join_date: string;
  type_user: number;
  ref_code: string;
  phone: number;
  validated_phone: boolean;
  is_active: boolean;
  is_staff: boolean;
  antecedentes_front: string | null;
  antecedentes_back: string | null;
  is_validated: number;
  is_validated_user: number;
  payment_default: number;
  card_default: string | null;
  rank_driver: number;
  rank_user: number;
  getgo_money: number;
  count_trip_complete: number;
  count_trip_current_month: number;
  document_sex_validator: string | null;
  is_woman_validated: number;
  pin_security: number;
  token_notification: string;
  count_trip_user_complete: number;
  id_number: string | null;
}

interface AccountBank {
  pk: number;
  user: number;
  name_bank: string;
  type_account: string;
  number_account: string;
  full_name_account: string;
  id_legal: string;
}

export interface Withdrawalorder {
  pk: number;
  user: User;
  account_bank: AccountBank;
  date_created: string;
  amount: number;
  status: number;
}

// Ejemplo de uso
const data: Withdrawalorder[] = [
  {
    pk: 22,
    user: {
      pk: 198,
      email: 'pato1@gmail.com',
      avatar: '/media/avatar/b708fdc8-f8dc-4403-ac28-9ed35628ca09.png',
      id_photo: '/media/id_photo/20a16999-d217-4cae-83a2-fa74ffcf23a5.png',
      first_name: 'Pato1',
      last_name: 'Larrain',
      sex: 1,
      join_date: '2024-06-12T09:15:41.630010',
      type_user: 1,
      ref_code: '75ED62',
      phone: 89980232,
      validated_phone: true,
      is_active: true,
      is_staff: false,
      antecedentes_front: null,
      antecedentes_back: null,
      is_validated: 2,
      is_validated_user: 1,
      payment_default: 1,
      card_default: null,
      rank_driver: 4.166666666666667,
      rank_user: 0.0,
      getgo_money: 146543,
      count_trip_complete: 6,
      count_trip_current_month: 11,
      document_sex_validator: null,
      is_woman_validated: 0,
      pin_security: 123456,
      token_notification:
        'd_hZXirGQ6GL6qoXVJ46nW:APA91bGVeznVSb-6ypn_UVlLeVR7yXG76HGaPr3JeeHIFV47706B0XPi9VTnX-e0QKXwCreP8SqTN5m24DuWS-AJo4IShDUYZ3bQNACFJ2R1Ru9Ph7U8RUW2iFp41W8G9YdUpC8ik-oA',
      count_trip_user_complete: 0,
      id_number: null
    },
    account_bank: {
      pk: 8,
      user: 198,
      name_bank: 'Santander',
      type_account: 'visa',
      number_account: '123455',
      full_name_account: 'patricio',
      id_legal: '105787541'
    },
    date_created: '2024-06-26T23:01:09.479214',
    amount: 10000,
    status: 0
  }
];
