import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopUno } from './shop-uno';

describe('ShopUno', () => {
  let component: ShopUno;
  let fixture: ComponentFixture<ShopUno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopUno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopUno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
