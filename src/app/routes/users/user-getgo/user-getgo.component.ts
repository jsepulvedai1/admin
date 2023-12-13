import { NgModule, Component, OnInit, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';

import { UserData } from '../users-detail/user-detail-interface';

@Component({
  selector: 'app-table',
  templateUrl: './user-getgo.component.html',
  styleUrls: ['./user-getgo.component.less']
})
export class UserGetgoComponent implements OnInit {
  @Input() userInfo: UserData | undefined = {};
  dataSource = [
    {
      mainRow: 'Mi rango',
      subColumnsRow: { left: '', center: '', right: this.userInfo?.range }
    },
    {
      mainRow: '',
      subColumnsRow: { left: 'izquierda', center: '', right: 'derecha' }
    },
    {
      mainRow: 'Referidos directos',
      subColumnsRow: { left: '10', center: '', right: '20' }
    },
    {
      mainRow: 'Referidos directos activos',
      subColumnsRow: { left: '10', center: '', right: '' }
    },
    {
      mainRow: 'Total mi red',
      subColumnsRow: { left: '10', center: '', right: '' }
    },
    {
      mainRow: 'Activos mi red',
      subColumnsRow: { left: '10', center: '', right: '' }
    },
    {
      mainRow: 'Ciclo mes',
      subColumnsRow: { left: '', center: '', right: '' }
    }
  ];

  ngOnInit(): void {
    console.log(this.userInfo);
    this.buildInfo();
  }

  buildInfo() {
    this.dataSource[0].subColumnsRow.right = this.userInfo?.range;
    //this.dataSource[1].subColumnsRow.right = this.userInfo?.range;
    this.dataSource[2].subColumnsRow.right = this.userInfo?.referidos_derecha?.toString();
    this.dataSource[2].subColumnsRow.left = this.userInfo?.referidos_izquierda?.toString() || '0';

    this.dataSource[3].subColumnsRow.right = this.userInfo?.referidos_activos_derecha?.toString();
    this.dataSource[3].subColumnsRow.left = this.userInfo?.referidos_activos_izquierda?.toString() || '0';

    this.dataSource[4].subColumnsRow.left = this.userInfo?.total_red?.toString() || '0';

    this.dataSource[5].subColumnsRow.right = this.userInfo?.total_red_activos?.toString();
    this.dataSource[5].subColumnsRow.left = this.userInfo?.total_red_activos?.toString() || '0';

    this.dataSource[6].subColumnsRow.center = this.userInfo?.ciclos?.toString() || '0';
  }
}
