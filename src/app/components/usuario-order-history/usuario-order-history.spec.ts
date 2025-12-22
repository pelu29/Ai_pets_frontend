import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioOrderHistory } from './usuario-order-history';

describe('UsuarioOrderHistory', () => {
  let component: UsuarioOrderHistory;
  let fixture: ComponentFixture<UsuarioOrderHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioOrderHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioOrderHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
