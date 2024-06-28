import { Component, Input } from '@angular/core';
@Component({
  selector: 'nz-demo-image-basic',
  template: ` <img nz-image width="100%" height="90%" [nzSrc]="imageUrl" alt="" /> `
})
export class NzDemoImageBasicComponent {
  @Input() imageUrl: string = '';
}
