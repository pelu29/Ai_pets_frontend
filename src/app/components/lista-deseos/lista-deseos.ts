import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-deseos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-deseos.html',
  styleUrls: ['./lista-deseos.css']
})
export class ListaDeseos implements OnInit {
  productos = [
    {
      id: 1,
      nombre: 'Green Capacum',
      precio: 14.98,
      precioEspecial: true,
      precioTexto: '$14.98',
      stock: true,
      imagen: '/Green Capacum.jpg', 
      descuentoTexto: 'Special price'
    },
    {
      id: 2,
      nombre: 'Chinese Cabbage',
      precio: 45.00,
      precioEspecial: false,
      precioTexto: '$45.00',
      stock: true,
      imagen: '/Chinese Cabbage.jpg', 
      descuentoTexto: 'Regular price'
    },
    {
      id: 3,
      nombre: 'Fresh Skippurl Mango',
      precio: 8.00,
      precioEspecial: true,
      precioTexto: '$08.00',
      stock: false,
      imagen: '/Mango.jpg', 
      descuentoTexto: 'Limited offer'
    }
  ];

  cartState: { [key: number]: boolean } = {};
  toastMessage: string = '';
  toastType: 'success' | 'warning' | 'danger' | 'info' = 'info';
  showToast: boolean = false;
  fechaActual: string = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  constructor() {
    this.productos.forEach(producto => {
      this.cartState[producto.id] = false;
    });
  }

  ngOnInit(): void {}

  toggleCartButton(producto: any): void {
    const isAdded = this.cartState[producto.id];
    
    if (isAdded) {
      this.cartState[producto.id] = false;
      this.mostrarToast(`${producto.nombre} removed from cart`, 'warning');
    } else {
      this.cartState[producto.id] = true;
      this.mostrarToast(`¡${producto.nombre} added to cart for ${producto.precioTexto}!`, 'success');
    }
  }

  eliminarProducto(id: number): void {
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
      this.productos = this.productos.filter(p => p.id !== id);
      this.mostrarToast(`${producto.nombre} has been removed from your wishlist`, 'danger');
    }
  }

  compartirFacebook(): void {
    this.mostrarToast('Sharing on Facebook...', 'info');
  }

  compartirPinterest(): void {
    this.mostrarToast('Sharing on Pinterest...', 'info');
  }

  compartirInstagram(): void {
    this.mostrarToast('Sharing on Instagram...', 'info');
  }

  compartirTwitter(): void {
    this.mostrarToast('Sharing on Twitter...', 'info');
  }

  mostrarToast(mensaje: string, tipo: 'success' | 'warning' | 'danger' | 'info'): void {
    this.toastMessage = mensaje;
    this.toastType = tipo;
    this.showToast = true;
    
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }

  cerrarToast(): void {
    this.showToast = false;
  }

  obtenerClaseToast(): string {
    switch(this.toastType) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-amber-500';
      case 'danger': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  }

  obtenerIconoToast(): string {
    switch(this.toastType) {
      case 'success': return 'fa-check-circle';
      case 'warning': return 'fa-exclamation-circle';
      case 'danger': return 'fa-times-circle';
      default: return 'fa-info-circle';
    }
  }

  manejarErrorImagen(event: any, productoNombre: string): void {
    console.error(`Error al cargar imagen para ${productoNombre}`);
    event.target.src = '/assets/default-product.jpg'; 
  }
}