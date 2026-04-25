import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NAVBAR } from './navbar';

describe('NAVBAR', () => {
  let component: NAVBAR;
  let fixture: ComponentFixture<NAVBAR>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NAVBAR],
    }).compileComponents();

    fixture = TestBed.createComponent(NAVBAR);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
