import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, ActivationEnd, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { Subscription, zip, filter } from 'rxjs';
import { UserService } from 'src/app/services/users-service';

import { UserData } from '../users-detail/user-detail-interface';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersDetailComponent implements OnInit {
  pk: string = '';
  token: string;
  Sexo = {
    Hombre: 1,
    Mujer: 2
  };

  Driver = {
    Conductor: 1,
    Pasajero: 2
  };

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
      console.log(res);
      this.userDetail = res;
      this.cdr.detectChanges();
    });
  }

  getUserProfile() {
    console.log(this.userDetail.user_name);
    this.userService.getUserProfile(this.pk).subscribe(res => {
      console.log(res);
      this.userDetail = res;
      // this.userDetail.join_date = this.formatIsoDate(this.userDetail.join_date || 'd');
      //console.log(this.userDetail.join_date);
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
