import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HERO } from './hero';

describe('HERO', () => {
  let component: HERO;
  let fixture: ComponentFixture<HERO>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HERO],
    }).compileComponents();

    fixture = TestBed.createComponent(HERO);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
