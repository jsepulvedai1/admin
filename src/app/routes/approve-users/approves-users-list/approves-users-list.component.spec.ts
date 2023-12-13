import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovesUsersListComponent } from './approves-users-list.component';

describe('ApprovesUsersListComponent', () => {
  let component: ApprovesUsersListComponent;
  let fixture: ComponentFixture<ApprovesUsersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovesUsersListComponent]
    });
    fixture = TestBed.createComponent(ApprovesUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
