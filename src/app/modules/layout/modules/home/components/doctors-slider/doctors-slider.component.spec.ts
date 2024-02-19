import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsSliderComponent } from './doctors-slider.component';

describe('DoctorsSliderComponent', () => {
  let component: DoctorsSliderComponent;
  let fixture: ComponentFixture<DoctorsSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorsSliderComponent]
    });
    fixture = TestBed.createComponent(DoctorsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
