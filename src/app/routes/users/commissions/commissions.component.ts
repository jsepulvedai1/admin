import { Component, Input, OnInit } from '@angular/core';
import { UserData } from '../users-detail/user-detail-interface';
import { UserService } from 'src/app/services/users-service';
@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrl: './commissions.component.less'
})
export class CommissionsComponent implements OnInit {
  constructor(private userService: UserService) {}
  @Input() userInfo: string = '';
  selectedWeek: number | null = null;
  selectedWeekInfo: any = null;
  totalCommision = '0';
  weeks: any[] = [];
  ngOnInit(): void {
    this.fetchInfoUser();
  }

  protected fetchInfoUser() {
    this.userService.getUserCommisionDetail(this.userInfo).subscribe(res => {
      this.totalCommision = res[0].total_comission_global;
      this.weeks = res[1];
    });
  }

  onWeekChange(week: number): void {
    this.selectedWeekInfo = this.weeks.find(w => w.week === week)?.info || null;
  }
}
