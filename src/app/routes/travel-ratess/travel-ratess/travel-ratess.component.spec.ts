import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelRatessComponent } from './travel-ratess.component';

describe('TravelRatessComponent', () => {
  let component: TravelRatessComponent;
  let fixture: ComponentFixture<TravelRatessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelRatessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TravelRatessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
