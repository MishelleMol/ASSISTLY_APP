import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VISION } from './vision';

describe('VISION', () => {
  let component: VISION;
  let fixture: ComponentFixture<VISION>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VISION],
    }).compileComponents();

    fixture = TestBed.createComponent(VISION);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
