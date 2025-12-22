import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDetalles } from './usuario-detalles';

describe('UsuarioDetalles', () => {
  let component: UsuarioDetalles;
  let fixture: ComponentFixture<UsuarioDetalles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioDetalles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioDetalles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
