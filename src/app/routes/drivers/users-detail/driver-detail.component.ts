import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, ActivationEnd, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { Subscription, zip, filter } from 'rxjs';
import { UserService } from 'src/app/services/users-service';

import { UserData } from '../users-detail/user-detail-interface';

@Component({
  selector: 'app-users-drivers',
  templateUrl: './drivers-detail.component.html',
  styleUrls: ['./drivers-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverDetailComponent implements OnInit {
  pk: string = '';
  token: string;
  Sexo = {
    'Sin informar': 0,
    Hombre: 1,
    Mujer: 2
  };

  Driver = {
    Conductor: 1,
    Pasajero: 2
  };

  activeUser = true;

  oldStatusDriver = 0;
  oldStatusUser = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = JSON.parse(localStorage.getItem('userData') || '{}').token;
    this.userDetail = {};
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.pk = params.get('id')!;
    });
  }
  private router$!: Subscription;
  public user: any;
  public userDetail: UserData;
  protected isActive: boolean = false;
  isActiveUser = false;
  @ViewChild('tagInput', { static: false }) private tagInput!: ElementRef<HTMLInputElement>;
  notice: any;
  tabs = [
    {
      key: 'articles',
      tab: 'Viajes'
    },
    {
      key: 'edit',
      tab: 'editar'
    }
  ];
  pos = 0;
  taging = false;
  tagValue = '';

  ngOnInit(): void {
    this.router$ = this.router.events.pipe(filter(e => e instanceof ActivationEnd)).subscribe(() => this.setActive());
    this.setActive();
    this.getUserProfile();
    this.getUserDetail();
  }

  private setActive(): void {
    const key = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    const idx = this.tabs.findIndex(w => w.key === key);
    if (idx !== -1) {
      this.pos = idx;
    }
  }
  to(item: { key: string }): void {
    const keys = {
      editar: 'edit'
    };
    this.router.navigateByUrl(`/users/${item.key}`);
  }
  tagShowIpt(): void {
    this.taging = true;
    this.cdr.detectChanges();
    this.tagInput.nativeElement.focus();
  }

  tagBlur(): void {
    const { user, cdr, tagValue } = this;
    if (tagValue && user.tags.filter((tag: { label: string }) => tag.label === tagValue).length === 0) {
      user.tags.push({ label: tagValue });
    }
    this.tagValue = '';
    this.taging = false;
    this.cdr.detectChanges();
    cdr.detectChanges();
  }

  tagEnter(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      this.tagBlur();
    }
  }

  protected getUserDetail() {
    this.userService.getUserDetail(this.pk).subscribe(res => {
      this.activeUser = res.is_validated === 0 ? false : true;
      console.log(res);
      this.isActiveUser = !!res.is_active;
      this.isActive = !res.is_active_user;
      this.cdr.detectChanges();
    });
  }

  getUserProfile() {
    this.userService.getUserProfile(this.pk).subscribe(res => {
      this.userDetail = res;
      // this.isActive = !res.is_active_user;
      this.cdr.detectChanges();
    });
  }

  updateStatusUser() {
    const statusUser = this.activeUser ? 0 : 2;
    const statusDriver = this.activeUser ? 0 : 2;
    console.log(statusDriver);
    this.userService.UpdateStatusDriver(this.pk, statusDriver).subscribe(res => {
      this.getUserProfile();
      this.cdr.detectChanges();
    });
  }

  formatIsoDate(isoDate: string): string {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long', // 'short', 'numeric', '2-digit', etc.
      day: 'numeric'
    };
    return date.toLocaleDateString('es-ES', options);
  }
}
