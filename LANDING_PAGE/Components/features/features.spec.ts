import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FEATURES } from './features';

describe('FEATURES', () => {
  let component: FEATURES;
  let fixture: ComponentFixture<FEATURES>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FEATURES],
    }).compileComponents();

    fixture = TestBed.createComponent(FEATURES);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
