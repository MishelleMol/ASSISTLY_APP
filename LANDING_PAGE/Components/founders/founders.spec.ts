import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FOUNDERS } from './founders';

describe('FOUNDERS', () => {
  let component: FOUNDERS;
  let fixture: ComponentFixture<FOUNDERS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FOUNDERS],
    }).compileComponents();

    fixture = TestBed.createComponent(FOUNDERS);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
