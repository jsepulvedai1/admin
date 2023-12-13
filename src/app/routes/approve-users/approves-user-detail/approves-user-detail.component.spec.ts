import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovesUserDetailComponent } from './approves-user-detail.component';

describe('ApprovesUserDetailComponent', () => {
  let component: ApprovesUserDetailComponent;
  let fixture: ComponentFixture<ApprovesUserDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovesUserDetailComponent]
    });
    fixture = TestBed.createComponent(ApprovesUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
