import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailUserWomanComponent } from './modal-detail-user.component';

describe('ModalDetailUserWomanComponent', () => {
  let component: ModalDetailUserWomanComponent;
  let fixture: ComponentFixture<ModalDetailUserWomanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDetailUserWomanComponent]
    });
    fixture = TestBed.createComponent(ModalDetailUserWomanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
