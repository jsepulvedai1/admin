import { Component, Input, OnInit } from '@angular/core';
import { UserData } from '../users-detail/user-detail-interface';

@Component({
  selector: 'app-getgo-balance',
  templateUrl: './getgo-balance.component.html',
  styleUrl: './getgo-balance.component.less'
})
export class GetgoBalanceComponent implements OnInit {
  @Input() userInfo: UserData | undefined = {};
  dataSource = [
    // {
    //   mainRow: 'Mi rango',
    //   subColumnsRow: { left: '', center: '', right: this.userInfo?.range }
    // },
    // {
    //   mainRow: '',
    //   subColumnsRow: { left: 'izquierda', center: '', right: 'derecha' }
    // },
    // {
    //   mainRow: 'Referidos directos',
    //   subColumnsRow: { left: '10', center: '', right: '20' }
    // },
    // {
    //   mainRow: 'Referidos directos activos',
    //   subColumnsRow: { left: '10', center: '', right: '' }
    // },
    // {
    //   mainRow: 'Total mi red',
    //   subColumnsRow: { left: '', center: '', right: '' }
    // },
    // {
    //   mainRow: 'Activos mi red',
    //   subColumnsRow: { left: '', center: '', right: '' }
    // },
    // {
    //   mainRow: 'Ciclo Semana',
    //   subColumnsRow: { left: '', center: '', right: '' }
    // },
    {
      mainRow: 'Saldo GetGo',
      subColumnsRow: { left: '', center: '', right: '' }
    }
    // {
    //   mainRow: 'Viajes del periodo',
    //   subColumnsRow: { left: '', center: '', right: '' }
    // },
    // {
    //   mainRow: 'Viajes Acumulados Totales usuario',
    //   subColumnsRow: { left: '', center: '', right: '' }
    // },
    // {
    //   mainRow: 'Viajes Acumulados Totales conductor',
    //   subColumnsRow: { left: '', center: '', right: '' }
    // }
  ];

  ngOnInit(): void {
    this.buildInfo();
  }

  buildInfo() {
    // this.dataSource[0].subColumnsRow.right = this.userInfo?.range;
    // //this.dataSource[1].subColumnsRow.right = this.userInfo?.range;
    // this.dataSource[2].subColumnsRow.right = this.userInfo?.referidos_derecha?.toString();
    // this.dataSource[2].subColumnsRow.left = this.userInfo?.referidos_izquierda?.toString() || '0';

    // this.dataSource[3].subColumnsRow.right = this.userInfo?.referidos_activos_derecha?.toString();
    // this.dataSource[3].subColumnsRow.left = this.userInfo?.referidos_activos_izquierda?.toString() || '0';

    // this.dataSource[4].subColumnsRow.center = this.userInfo?.total_red?.toString() || '0';

    // this.dataSource[5].subColumnsRow.center = this.userInfo?.total_red_activos?.toString() || '0';

    // this.dataSource[6].subColumnsRow.center = this.userInfo?.ciclos?.toString() || '0';
    this.dataSource[0].subColumnsRow.center = this.userInfo?.getgo_money?.toString() || '0';
    // this.dataSource[8].subColumnsRow.center = this.userInfo?.trip_month_current?.toString() || '0';
    // this.dataSource[9].subColumnsRow.center = this.userInfo?.trip_count_user?.toString() || '0';
    // this.dataSource[10].subColumnsRow.center = this.userInfo?.trip_count_driver?.toString() || '0';
  }
}
