import { Producto } from './producto.model';

export interface ItemDeseo {
  producto: Producto;
  fechaAgregado?: Date;
}
