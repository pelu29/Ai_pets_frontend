import { ItemCarrito } from './item-carrito.model';
import { Shipping } from './shipping.model';

export interface OrderSummary {
  items: ItemCarrito[];

  subtotalProductos: number;
  shipping: Shipping;

  total: number;
}
