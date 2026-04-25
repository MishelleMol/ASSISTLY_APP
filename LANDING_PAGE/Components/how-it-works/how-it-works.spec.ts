import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HOWITWORKS } from './how-it-works';

describe('HOWITWORKS', () => {
  let component: HOWITWORKS;
  let fixture: ComponentFixture<HOWITWORKS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HOWITWORKS],
    }).compileComponents();

    fixture = TestBed.createComponent(HOWITWORKS);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
