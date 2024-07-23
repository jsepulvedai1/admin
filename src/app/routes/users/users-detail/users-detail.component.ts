import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, ActivationEnd, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { Subscription, zip, filter } from 'rxjs';
import { UserService } from 'src/app/services/users-service';

import { UserData } from '../users-detail/user-detail-interface';
import { Location } from '@angular/common';

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
    'Sin informar': 0,
    Hombre: 1,
    Mujer: 2
  };

  Driver = {
    Conductor: 1,
    Pasajero: 2
  };

  activeUser = false;

  oldStatusDriver = 0;
  oldStatusUser = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
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

  blockBackButton() {
    this.location.subscribe(() => {
      this.router.navigateByUrl('/users/detail/202'); // Reemplaza '/current-page' con la URL de la página actual
    });
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
      this.userDetail = res;
      this.cdr.detectChanges();
    });
  }

  getUserProfile() {
    this.userService.getUserProfile(this.pk).subscribe(res => {
      this.userDetail = res;
      this.activeUser = res.is_validated_user === 0 ? false : true;
      this.cdr.detectChanges();
    });
  }

  updateStatusUser() {
    const statusUser = this.activeUser ? 0 : 2;
    const statusDriver = this.activeUser ? 0 : this.oldStatusDriver;

    this.userService.UpdateStatusUser(this.pk, statusUser).subscribe(res => {
      this.userDetail = res;
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
