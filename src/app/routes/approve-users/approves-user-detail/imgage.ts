import { Component, Input } from '@angular/core';
@Component({
  selector: 'nz-demo-image-basic',
  styleUrls: ['./approves-user-detail.component.less'],
  template: ` <img class="user-image" nz-image width="100%" height="90%" [nzSrc]="imageUrl" alt="" /> `
})
export class NzDemoImageBasicComponent {
  @Input() imageUrl: string = '';
}
