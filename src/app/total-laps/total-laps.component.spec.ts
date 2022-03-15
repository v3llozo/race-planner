import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalLapsComponent } from './total-laps.component';

describe('TotalLapsComponent', () => {
  let component: TotalLapsComponent;
  let fixture: ComponentFixture<TotalLapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalLapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalLapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
