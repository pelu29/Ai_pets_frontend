import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCarrito } from '../../models/item-carrito.model';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})

export class Carrito {
  items: ItemCarrito[] = [
    // Ejemplo de datos, en un app real vendrían de un servicio
    {
      producto: {
        id: 1,
        nombre: 'Croquetas Premium Adulto 15kg',
        precio: 180,
        imagen: '/img/croquetas-adulto.jpg',
        stock: 25,
        disponible: true,
        categoria: 'Alimentos',
        descripcion: 'Alimento balanceado para perros adultos'
      },
      cantidad: 2,
      subtotal: 360
    },
    {
      producto: {
        id: 3,
        nombre: 'Hueso de Juguete Resistente',
        precio: 25,
        imagen: '/img/hueso-juguete.jpg',
        stock: 40,
        disponible: true,
        categoria: 'Juguetes',
        descripcion: 'Juguete de goma resistente para masticar'
      },
      cantidad: 1,
      subtotal: 25
    }
  ];

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.subtotal, 0);
  }

  aumentarCantidad(item: ItemCarrito): void {
    if (item.cantidad < item.producto.stock) {
      item.cantidad++;
      item.subtotal = item.cantidad * item.producto.precio;
    }
  }

  disminuirCantidad(item: ItemCarrito): void {
    if (item.cantidad > 1) {
      item.cantidad--;
      item.subtotal = item.cantidad * item.producto.precio;
    }
  }

  eliminarItem(index: number): void {
    this.items.splice(index, 1);
  }

  continuarComprando(): void {
    // Lógica para navegar a la página de productos
    console.log('Continuar comprando');
  }

  updateCart(): void {
    // Lógica para actualizar el carrito
    console.log('Update cart');
  }

  procederPago(): void {
    // Lógica para proceder al pago
    console.log('Proceder al pago');
  }
}
