import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsEditComponent } from './colors-edit.component';

describe('ColorsEditComponent', () => {
  let component: ColorsEditComponent;
  let fixture: ComponentFixture<ColorsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
