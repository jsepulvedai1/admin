import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailUserComponent } from './modal-detail-user.component';

describe('ModalDetailUserComponent', () => {
  let component: ModalDetailUserComponent;
  let fixture: ComponentFixture<ModalDetailUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDetailUserComponent]
    });
    fixture = TestBed.createComponent(ModalDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
