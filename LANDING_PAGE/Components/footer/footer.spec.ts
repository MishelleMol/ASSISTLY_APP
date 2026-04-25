import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FOOTER } from './footer';

describe('FOOTER', () => {
  let component: FOOTER;
  let fixture: ComponentFixture<FOOTER>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FOOTER],
    }).compileComponents();

    fixture = TestBed.createComponent(FOOTER);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
