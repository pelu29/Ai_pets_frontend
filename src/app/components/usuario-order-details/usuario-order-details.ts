import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface OpcionNavegacion {
  nombre: string;
  activo: boolean;
  icono: string;
}

@Component({
  selector: 'app-usuario-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-order-details.html',
  styleUrls: ['./usuario-order-details.css']
})
export class UsuarioOrderDetailsComponent implements OnInit {

  opcionesNavegacion: OpcionNavegacion[] = [
    { nombre: 'Dashboard',          activo: false, icono: 'fa-th-large' },
    { nombre: 'Historial de ordenes', activo: true,  icono: 'fa-history' },
    { nombre: 'Lista de deseos',    activo: false, icono: 'fa-heart' },
    { nombre: 'Carrito de compras', activo: false, icono: 'fa-shopping-cart' },
    { nombre: 'Ajustes',            activo: false, icono: 'fa-cog' },
    { nombre: 'Cerrar sesión',      activo: false, icono: 'fa-sign-out-alt' }
  ];

  orderDetails = {
    id: '#4152',
    date: 'April 24, 2021',
    itemsCount: 3,
    paymentMethod: 'Paypal',
    subtotal: 365.00,
    discount: 20,
    shipping: 'Free',
    total: 84.00
  };

  customer = {
    name: 'Dainne Russell',
    address: '4140 Parker Rd. Allentown, New Mexico 31134',
    email: 'dainne.ressell@gmail.com',
    phone: '(671) 555-0110'
  };

  currentStep = 2;
  
  steps = [
    { number: 1, label: 'Order received' },
    { number: 2, label: 'Processing' },
    { number: 3, label: 'On the way' },
    { number: 4, label: 'Delivered' }
  ];

products = [
  { 
    name: 'Red Capsicum', 
    price: 14.00, 
    quantity: 5, 
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=100&h=100&fit=crop&q=80'
  },
  { 
    name: 'Green Capsicum', 
    price: 14.00, 
    quantity: 2, 
    image: 'https://images.unsplash.com/photo-1576435777169-e77029519157?w=100&h=100&fit=crop&q=80'
  },
  { 
    name: 'Green Chili', 
    price: 26.70, 
    quantity: 10, 
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=100&h=100&fit=crop&q=80'
  }
];

  constructor() { 
    console.log('Products:', this.products); 
  }

  ngOnInit(): void {
  }

  seleccionarOpcion(opcionSeleccionada: OpcionNavegacion) {
    this.opcionesNavegacion.forEach(op => op.activo = false);
    opcionSeleccionada.activo = true;
  }

  calculateSubtotal(price: number, qty: number): number {
    return price * qty;
  }
}