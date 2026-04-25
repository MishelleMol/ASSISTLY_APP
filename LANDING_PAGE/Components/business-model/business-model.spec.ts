import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BUSINESSMODEL } from './business-model';

describe('BUSINESSMODEL', () => {
  let component: BUSINESSMODEL;
  let fixture: ComponentFixture<BUSINESSMODEL>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BUSINESSMODEL],
    }).compileComponents();

    fixture = TestBed.createComponent(BUSINESSMODEL);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
