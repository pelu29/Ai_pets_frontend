import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pedido {
  id: number;
  cliente: string;
  productos: string[];
  total: number;
  estado: 'pendiente' | 'enviado' | 'entregado';
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private apiUrl = 'https://api.ejemplo.com/pedidos';

  constructor(private http: HttpClient) {}

  // GET
  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }
  // GET con filtro
  getPedidosPorCliente(cliente: string): Observable<Pedido[]> {
    const params = new HttpParams().set('cliente', cliente);
    return this.http.get<Pedido[]>(this.apiUrl, { params });
  }
  // GET
  getPedido(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }
  // POST
  crearPedido(pedido: Omit<Pedido, 'id'>): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }
  // PUT
  actualizarPedido(id: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${id}`, pedido);
  }
  // PATCH
  cambiarEstado(id: number, estado: Pedido['estado']): Observable<Pedido> {
    return this.http.patch<Pedido>(`${this.apiUrl}/${id}`, { estado });
  }
  // DELETE
  eliminarPedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}