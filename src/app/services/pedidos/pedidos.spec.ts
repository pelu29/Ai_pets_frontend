import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PedidosService, Pedido } from './pedidos';

describe('PedidosService', () => {
  let service: PedidosService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://api.ejemplo.com/pedidos';

  const pedidoMock: Pedido = {
    id: 1,
    cliente: 'Juan Pérez',
    productos: ['Laptop', 'Mouse'],
    total: 1200,
    estado: 'pendiente',
    fecha: '2024-01-15'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PedidosService]
    });
    
    service = TestBed.inject(PedidosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener todos los pedidos ', () => {
    const pedidosMock: Pedido[] = [pedidoMock];

    service.getPedidos().subscribe(pedidos => {
      expect(pedidos).toEqual(pedidosMock);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(pedidosMock);
  });

  it('debería obtener pedidos filtrados por cliente ', () => {
    const cliente = 'Juan Pérez';
    const pedidosFiltrados = [pedidoMock];
    
    service.getPedidosPorCliente(cliente).subscribe(pedidos => {
      expect(pedidos).toEqual(pedidosFiltrados);
    });
    
    const req = httpMock.expectOne(request => {
      const isCorrectUrl = request.url === apiUrl;
      const hasCorrectParam = request.params.get('cliente') === cliente;
      return isCorrectUrl && hasCorrectParam;
    });
    
    expect(req.request.method).toBe('GET');
    req.flush(pedidosFiltrados);
  });

  it('debería obtener un pedido por ID ', () => {
    const pedidoId = 1;

    service.getPedido(pedidoId).subscribe(pedido => {
      expect(pedido).toEqual(pedidoMock);
    });

    const req = httpMock.expectOne(`${apiUrl}/${pedidoId}`);
    expect(req.request.method).toBe('GET');
    req.flush(pedidoMock);
  });

  it('debería crear un nuevo pedido ', () => {
    const nuevoPedido = { ...pedidoMock, id: undefined } as any;

    service.crearPedido(nuevoPedido).subscribe(pedido => {
      expect(pedido).toEqual(pedidoMock);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(nuevoPedido);
    req.flush(pedidoMock);
  });

  it('debería actualizar un pedido ', () => {
    const pedidoActualizado = { ...pedidoMock, total: 1500 };

    service.actualizarPedido(pedidoMock.id, pedidoActualizado).subscribe(pedido => {
      expect(pedido.total).toBe(1500);
    });

    const req = httpMock.expectOne(`${apiUrl}/${pedidoMock.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(pedidoActualizado);
    req.flush(pedidoActualizado);
  });

  it('debería cambiar el estado de un pedido', () => {
    const nuevoEstado = 'enviado';

    service.cambiarEstado(pedidoMock.id, nuevoEstado).subscribe(pedido => {
      expect(pedido.estado).toBe(nuevoEstado);
    });

    const req = httpMock.expectOne(`${apiUrl}/${pedidoMock.id}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ estado: nuevoEstado });
    req.flush({ ...pedidoMock, estado: nuevoEstado });
  });

  it('debería eliminar un pedido ', () => {
    const pedidoId = 1;

    service.eliminarPedido(pedidoId).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/${pedidoId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('debería manejar errores HTTP', () => {
    const pedidoId = 999;

    service.getPedido(pedidoId).subscribe({
      next: () => fail('Debería haber fallado'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = httpMock.expectOne(`${apiUrl}/${pedidoId}`);
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });
});