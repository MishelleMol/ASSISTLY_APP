import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shoopers } from './shoopers';

describe('Shoopers', () => {
  let component: Shoopers;
  let fixture: ComponentFixture<Shoopers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shoopers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Shoopers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
