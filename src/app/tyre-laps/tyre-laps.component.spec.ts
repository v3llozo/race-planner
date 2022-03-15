import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyreLapsComponent } from './tyre-laps.component';

describe('TyreLapsComponent', () => {
  let component: TyreLapsComponent;
  let fixture: ComponentFixture<TyreLapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyreLapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TyreLapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
