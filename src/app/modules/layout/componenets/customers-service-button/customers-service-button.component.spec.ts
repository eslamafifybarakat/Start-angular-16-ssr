import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersServiceButtonComponent } from './customers-service-button.component';

describe('CustomersServiceButtonComponent', () => {
  let component: CustomersServiceButtonComponent;
  let fixture: ComponentFixture<CustomersServiceButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomersServiceButtonComponent]
    });
    fixture = TestBed.createComponent(CustomersServiceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
