import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shoppers } from './shoppers';

describe('Shoppers', () => {
  let component: Shoppers;
  let fixture: ComponentFixture<Shoppers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shoppers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Shoppers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
