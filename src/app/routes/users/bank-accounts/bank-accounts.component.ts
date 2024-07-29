import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users-service';

interface BankAccount {
  pk: number;
  user: number;
  name_bank: string;
  type_account: string;
  number_account: string;
  full_name_account: string;
  id_legal: string;
}

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrl: './bank-accounts.component.less'
})
export class BankAccountsComponent implements OnInit {
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.fetchInfoUser();
  }
  @Input() userInfo: string = '';
  bankAccounts: BankAccount[] = [];

  protected fetchInfoUser() {
    console.log(this.userInfo);
    this.userService.getUserBankAccount(this.userInfo).subscribe(res => {
      console.log(res);
      this.bankAccounts = res;
    });
  }
}
