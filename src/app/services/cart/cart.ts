import { Injectable } from '@angular/core';
import { ItemCarrito } from '../../models/item-carrito.model';
import { Producto } from '../../models/producto.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: ItemCarrito[] = [];

  constructor() {
    this.load();
  }

  private save() {
    try { localStorage.setItem('cart', JSON.stringify(this.items)); } catch (e) { /* ignore */ }
  }

  private load() {
    try {
      const raw = localStorage.getItem('cart');
      if (raw) this.items = JSON.parse(raw);
    } catch (e) { this.items = []; }
  }

  getItems(): ItemCarrito[] {
    return this.items;
  }

  add(product: any, qty = 1) {
    // Normalizar producto y generar una clave estable si no existe id
    const nombre = String(product.name || product.nombre || '').trim();
    const precio = parseFloat(String(product.price ?? product.precio ?? 0)) || 0;
    const imagen = product.image || product.imagen || '';
    const stock = product.stock || 999;
    const disponible = !(product.isOutOfStock === true);

    // Si viene un id numérico válido, úsalo; si no, genere una clave basada en nombre+precio
    const rawId = product.id ?? product.ID ?? 0;
    const id = (typeof rawId === 'number' && rawId > 0) ? rawId : 0;

    const prod: Producto = {
      id,
      nombre,
      precio,
      imagen,
      stock,
      disponible
    };

    // Match: si id válido, buscar por id; si no, buscar por nombre+precio
    let existing: ItemCarrito | undefined;
    if (prod.id && prod.id > 0) {
      existing = this.items.find(i => i.producto.id === prod.id);
    } else {
      existing = this.items.find(i => i.producto.nombre === prod.nombre && Number(i.producto.precio) === Number(prod.precio));
    }

    if (existing) {
      existing.cantidad += qty;
      existing.subtotal = existing.cantidad * existing.producto.precio;
    } else {
      this.items.push({ producto: prod, cantidad: qty, subtotal: qty * prod.precio });
    }
    this.save();
  }

  remove(index: number) {
    this.items.splice(index, 1);
    this.save();
  }

  clear() {
    this.items = [];
    this.save();
  }

  increase(item: ItemCarrito) {
    if (item.cantidad < item.producto.stock) {
      item.cantidad++;
      item.subtotal = item.cantidad * item.producto.precio;
      this.save();
    }
  }

  decrease(item: ItemCarrito) {
    if (item.cantidad > 1) {
      item.cantidad--;
      item.subtotal = item.cantidad * item.producto.precio;
      this.save();
    }
  }

  getTotal(): number {
    return this.items.reduce((s, i) => s + (i.subtotal || 0), 0);
  }
}
