import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRegiterationComponent } from './doctor-regiteration.component';

describe('DoctorRegiterationComponent', () => {
  let component: DoctorRegiterationComponent;
  let fixture: ComponentFixture<DoctorRegiterationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorRegiterationComponent]
    });
    fixture = TestBed.createComponent(DoctorRegiterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
