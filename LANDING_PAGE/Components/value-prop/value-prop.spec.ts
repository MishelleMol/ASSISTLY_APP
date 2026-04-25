import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VALUEPROP } from './value-prop';

describe('VALUEPROP', () => {
  let component: VALUEPROP;
  let fixture: ComponentFixture<VALUEPROP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VALUEPROP],
    }).compileComponents();

    fixture = TestBed.createComponent(VALUEPROP);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
