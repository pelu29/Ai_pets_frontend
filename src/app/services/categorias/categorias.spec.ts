import { TestBed } from '@angular/core/testing';

import { Categorias } from './categorias';

describe('Categorias', () => {
  let service: Categorias;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Categorias);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("deberia devolver un valor",() => {
    const obtener = service.getCategorias();
    expect(obtener.length).toBeGreaterThan(0);
  })

  it("deberia devolver un boolean",()=>{
    const metodo = service.getBoolean();
    expect(metodo).toBeNull();
  })
});
