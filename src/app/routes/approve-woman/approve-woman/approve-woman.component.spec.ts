import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveWomanComponent } from './approve-woman.component';

describe('ApproveWomanComponent', () => {
  let component: ApproveWomanComponent;
  let fixture: ComponentFixture<ApproveWomanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveWomanComponent]
    });
    fixture = TestBed.createComponent(ApproveWomanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
