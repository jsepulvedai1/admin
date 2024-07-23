import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetgoBalanceComponent } from './getgo-balance.component';

describe('GetgoBalanceComponent', () => {
  let component: GetgoBalanceComponent;
  let fixture: ComponentFixture<GetgoBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetgoBalanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetgoBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
