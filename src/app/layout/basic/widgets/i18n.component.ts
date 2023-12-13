import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { I18NService } from '@core';
import { ALAIN_I18N_TOKEN, SettingsService } from '@delon/theme';
import { BooleanInput, InputBoolean } from '@delon/util/decorator';

@Component({
  selector: 'header-i18n',
  template: `
    <div *ngIf="showLangText" nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight">
      <i nz-icon nzType="global"></i>
      {{ 'menu.lang' | i18n }}
      <i nz-icon nzType="down"></i>
    </div>
    <i *ngIf="!showLangText" nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight" nz-icon nzType="global"></i>
    <nz-dropdown-menu #langMenu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item *ngFor="let item of langs" [nzSelected]="item.code === curLangCode" (click)="change(item.code)">
          <span role="img" [attr.aria-label]="item.text" class="pr-xs">{{ item.abbr }}</span>
          {{ item.text }}
        </li>
      </ul>
    </nz-dropdown-menu>
    <div *ngIf="showLangText" nz-dropdown [nzDropdownMenu]="urlMenu" nzPlacement="bottomRight">
      <i nz-icon nzType="global"></i>
      {{ 'menu.url' | i18n }}
      <i nz-icon nzType="down"></i>
    </div>
    <i *ngIf="!showLangText" nz-dropdown [nzDropdownMenu]="urlMenu" nzPlacement="bottomRight" nz-icon nzType="code"></i>
    <nz-dropdown-menu #urlMenu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item *ngFor="let item of url" [nzSelected]="item.code === curLangCode" (click)="setUrl(item.code)">
          <span role="img" [attr.aria-label]="item.text" class="pr-xs">{{ item.abbr }}</span>
          {{ item.text }}
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
  host: {
    '[class.flex-1]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderI18nComponent {
  static ngAcceptInputType_showLangText: BooleanInput;
  /** Whether to display language text */
  @Input() @InputBoolean() showLangText = true;

  get langs(): Array<{ code: string; text: string; abbr: string }> {
    return this.i18n.getLangs();
  }

  get url(): Array<{ code: string; text: string; abbr: string }> {
    return this.i18n.getUrls();
  }
  get curLangCode(): string {
    return this.settings.layout.lang;
  }

  constructor(
    private settings: SettingsService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    @Inject(DOCUMENT) private doc: any
  ) {}

  setUrl(lang: string): void {
    console.log(lang);
    //localStorage.clear();
    localStorage.setItem('url', JSON.stringify(lang));
    // console.log(this.url);
    // // const spinEl = this.doc.createElement('div');
    // // spinEl.setAttribute('class', `page-loading ant-spin ant-spin-lg ant-spin-spinning`);
    // // spinEl.innerHTML = `<span class="ant-spin-dot ant-spin-dot-spin"><i></i><i></i><i></i><i></i></span>`;
    // // this.doc.body.appendChild(spinEl);
    // //this.settings.setUrlType('DEV');
    // // setTimeout(() => this.doc.location.reload());
    // this.i18n.loadLangData('en-US').subscribe(res => {
    //   this.i18n.use('en-US', res);
    //   this.settings.setUrlType('lang');
    //   setTimeout(() => this.doc.location.reload());
    // });
  }

  change(lang: string): void {
    const spinEl = this.doc.createElement('div');
    spinEl.setAttribute('class', `page-loading ant-spin ant-spin-lg ant-spin-spinning`);
    spinEl.innerHTML = `<span class="ant-spin-dot ant-spin-dot-spin"><i></i><i></i><i></i><i></i></span>`;
    this.doc.body.appendChild(spinEl);

    this.i18n.loadLangData(lang).subscribe(res => {
      this.i18n.use(lang, res);
      this.settings.setLayout('lang', lang);
      setTimeout(() => this.doc.location.reload());
    });
  }
}
