import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGetgoComponent } from './user-getgo.component';

describe('UserGetgoComponent', () => {
  let component: UserGetgoComponent;
  let fixture: ComponentFixture<UserGetgoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserGetgoComponent]
    });
    fixture = TestBed.createComponent(UserGetgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
