import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopperDashboard } from './shopper-dashboard';

describe('ShopperDashboard', () => {
  let component: ShopperDashboard;
  let fixture: ComponentFixture<ShopperDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopperDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopperDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
