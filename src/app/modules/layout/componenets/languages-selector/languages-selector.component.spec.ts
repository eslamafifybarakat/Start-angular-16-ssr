import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesSelectorComponent } from './languages-selector.component';

describe('LanguagesSelectorComponent', () => {
  let component: LanguagesSelectorComponent;
  let fixture: ComponentFixture<LanguagesSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguagesSelectorComponent]
    });
    fixture = TestBed.createComponent(LanguagesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
