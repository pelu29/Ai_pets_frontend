import { PaymentMethod } from './payment-method.model';

export interface Payment {
  metodo: PaymentMethod;
  monto: number;
  moneda: 'USD' | 'PEN';
}
