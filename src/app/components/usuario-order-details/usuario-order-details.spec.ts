import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioOrderDetails } from './usuario-order-details';

describe('UsuarioOrderDetails', () => {
  let component: UsuarioOrderDetails;
  let fixture: ComponentFixture<UsuarioOrderDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioOrderDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioOrderDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
