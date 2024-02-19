import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialitiesSliderComponent } from './specialities-slider.component';

describe('SpecialitiesSliderComponent', () => {
  let component: SpecialitiesSliderComponent;
  let fixture: ComponentFixture<SpecialitiesSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialitiesSliderComponent]
    });
    fixture = TestBed.createComponent(SpecialitiesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
