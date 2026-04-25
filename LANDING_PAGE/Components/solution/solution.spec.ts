import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SOLUTION } from './solution';

describe('SOLUTION', () => {
  let component: SOLUTION;
  let fixture: ComponentFixture<SOLUTION>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SOLUTION],
    }).compileComponents();

    fixture = TestBed.createComponent(SOLUTION);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
