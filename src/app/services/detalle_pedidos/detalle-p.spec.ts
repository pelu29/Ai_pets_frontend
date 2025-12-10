import { TestBed } from '@angular/core/testing';

import { DetalleP } from './detalle-p';

describe('DetalleP', () => {
  let service: DetalleP;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleP);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
