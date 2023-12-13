import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovesUserWomanDetailComponent } from './approves-user-woman-detail.component';

describe('ApprovesUserWomanDetailComponent', () => {
  let component: ApprovesUserWomanDetailComponent;
  let fixture: ComponentFixture<ApprovesUserWomanDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovesUserWomanDetailComponent]
    });
    fixture = TestBed.createComponent(ApprovesUserWomanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
