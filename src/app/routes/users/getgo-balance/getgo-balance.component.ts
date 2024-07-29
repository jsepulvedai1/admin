import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users-service';

@Component({
  selector: 'app-getgo-balance',
  templateUrl: './getgo-balance.component.html',
  styleUrls: ['./getgo-balance.component.less']
})
export class GetgoBalanceComponent implements OnInit {
  constructor(private userService: UserService) {}

  @Input() userInfo: string = '';
  selectedWeek: number | null = null;
  selectedWeekInfo: any = null;
  totalCommission = '0';
  weeks: any[] = [];

  ngOnInit(): void {
    this.fetchInfoUser();
  }

  protected fetchInfoUser() {
    this.userService.getUserWalletDetail(this.userInfo).subscribe(res => {
      console.log(res);
      this.weeks = res[0]; // Assuming res[0] contains the relevant weeks data
      this.calculateTotalCommission();
      this.selectLatestWeek();
    });
  }

  onWeekChange(week: number): void {
    this.selectedWeekInfo = this.weeks.find(w => w.week === week)?.info || null;
  }

  private calculateTotalCommission() {
    let total = 0;
    for (const week of this.weeks) {
      total += week.info.total;
    }
    //this.totalCommission = total;
  }

  private selectLatestWeek() {
    if (this.weeks.length > 0) {
      const latestWeek = Math.max(...this.weeks.map(w => w.week));
      this.selectedWeek = latestWeek;
      this.onWeekChange(latestWeek);
    }
  }
}
