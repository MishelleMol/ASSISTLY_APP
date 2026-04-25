import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PROBLEM } from './problem';

describe('PROBLEM', () => {
  let component: PROBLEM;
  let fixture: ComponentFixture<PROBLEM>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PROBLEM],
    }).compileComponents();

    fixture = TestBed.createComponent(PROBLEM);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
