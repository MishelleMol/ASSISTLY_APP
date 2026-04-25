import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTA } from './cta';

describe('CTA', () => {
  let component: CTA;
  let fixture: ComponentFixture<CTA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CTA],
    }).compileComponents();

    fixture = TestBed.createComponent(CTA);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
