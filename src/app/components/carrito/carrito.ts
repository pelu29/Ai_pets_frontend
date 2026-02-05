import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCarrito } from '../../models/item-carrito.model';
import { Producto } from '../../models/producto.model';
import { CartService } from '../../services/cart/cart';
import { Router } from '@angular/router';
import { Sede, SEDES } from '../../shared/sedes.data';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})

export class Carrito {
  items: ItemCarrito[] = [];
  sedes: Sede[] = SEDES;
  showSedeModal = false;
  selectedSede: Sede | null = null;

  constructor(private cart: CartService, private router: Router) {
    this.items = this.cart.getItems();
  }

  get total(): number {
    return this.cart.getTotal();
  }

  aumentarCantidad(item: ItemCarrito): void {
    this.cart.increase(item);
    this.items = this.cart.getItems();
  }

  disminuirCantidad(item: ItemCarrito): void {
    this.cart.decrease(item);
    this.items = this.cart.getItems();
  }

  eliminarItem(index: number): void {
    this.cart.remove(index);
    this.items = this.cart.getItems();
  }

  continuarComprando(): void {
    this.router.navigate(['/shop-uno']);
  }

  updateCart(): void {
    // el servicio ya persiste los cambios
  }

  vaciarCarrito(): void {
    if (!confirm('¿Vaciar el carrito?')) return;
    this.cart.clear();
    this.items = this.cart.getItems();
  }

  hacerPedido(): void {
    if (!this.items || this.items.length === 0) return alert('El carrito está vacío');
    this.selectedSede = this.sedes[0] || null;
    this.showSedeModal = true;
  }

  confirmPedido() {
    if (!this.selectedSede) return;
    const lines = this.items.map(i => `- ${i.producto.nombre} x${i.cantidad} S/ ${i.producto.precio.toFixed(2)}`);
    const subtotal = this.total.toFixed(2);
    const message = `Hola AIPets, deseo separar estos productos:\n${lines.join('\n')}\nTotal: S/ ${subtotal}\nQuiero separar estos productos y vengo de la página web.`;
    const url = `https://wa.me/${this.selectedSede.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    this.showSedeModal = false;
  }
}
