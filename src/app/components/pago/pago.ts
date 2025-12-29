import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PRODUCTOS } from '../../data/productos.data';
import { ItemCarrito } from '../../models/item-carrito.model';
import { OrderSummary } from '../../models/order-summary.model';
import { PaymentMethod } from '../../models/payment-method.model';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pago.html'
})
export class Pago implements OnInit {

  // ===============================
  // DATOS DE FACTURACIÓN
  // ===============================
  firstName = '';
  lastName = '';
  companyName = '';
  streetAddress = '';
  country = '';
  state = '';
  zipCode = '';
  email = '';
  phone = '';
  shipToDifferentAddress = false;
  orderNotes = '';

  // ===============================
  // SELECTS
  // ===============================
  countries: string[] = ['Perú', 'Colombia', 'Chile', 'Argentina', 'México'];
  states: string[] = ['Lima', 'Arequipa', 'Cusco', 'Trujillo', 'Piura'];

  // ===============================
  // CARRITO (DESDE DATA)
  // ===============================
  cartItems: ItemCarrito[] = [];

  // ===============================
  // MÉTODOS DE PAGO
  // ===============================
  paymentMethods: PaymentMethod[] = [
    'cash_on_delivery',
    'paypal',
    'amazon_pay'
  ];

  selectedPaymentMethod: PaymentMethod = 'amazon_pay';

  // ===============================
  // ORDER SUMMARY
  // ===============================
  orderSummary: OrderSummary = {
    items: [],
    subtotalProductos: 0,
    shipping: {
      tipo: 'free',
      costo: 0
    },
    total: 0
  };

  ngOnInit(): void {
    this.loadCart();
    this.calculateOrderSummary();
  }

  // ===============================
  // SIMULAR CARRITO
  // ===============================
  loadCart(): void {
    this.cartItems = [
      {
        producto: PRODUCTOS[0], // Croquetas Adulto
        cantidad: 1,
        subtotal: PRODUCTOS[0].precio * 1
      },
      {
        producto: PRODUCTOS[1], // Croquetas Cachorro
        cantidad: 2,
        subtotal: PRODUCTOS[1].precio * 2
      }
    ];
  }

  // ===============================
  // CALCULAR RESUMEN
  // ===============================
  calculateOrderSummary(): void {
    this.orderSummary.subtotalProductos = this.cartItems.reduce(
      (acc, item) => acc + item.subtotal,
      0
    );

    this.orderSummary.total =
      this.orderSummary.subtotalProductos +
      this.orderSummary.shipping.costo;

    this.orderSummary.items = this.cartItems;
  }

  // ===============================
  // LABEL PAGO
  // ===============================
  getPaymentMethodLabel(method: PaymentMethod): string {
    switch (method) {
      case 'cash_on_delivery':
        return 'Pago contra entrega';
      case 'paypal':
        return 'PayPal';
      case 'amazon_pay':
        return 'Amazon Pay';
      default:
        return '';
    }
  }

  // ===============================
  // REALIZAR PEDIDO
  // ===============================
  placeOrder(): void {
    if (!this.firstName || !this.lastName || !this.email || !this.streetAddress) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const orderData = {
      billingInfo: {
        firstName: this.firstName,
        lastName: this.lastName,
        companyName: this.companyName,
        streetAddress: this.streetAddress,
        country: this.country,
        state: this.state,
        zipCode: this.zipCode,
        email: this.email,
        phone: this.phone
      },
      shipToDifferentAddress: this.shipToDifferentAddress,
      orderNotes: this.orderNotes,
      paymentMethod: this.selectedPaymentMethod,
      orderSummary: this.orderSummary
    };

    console.log('Pedido realizado:', orderData);
    alert(`¡Pedido realizado exitosamente!\nTotal: S/. ${this.orderSummary.total.toFixed(2)}`);
  }
}
