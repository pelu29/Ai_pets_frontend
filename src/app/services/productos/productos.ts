import { Injectable } from '@angular/core';

export interface ProductAdmin {
  id: number;
  name: string;
  price: number;
  image: string; 
  rating?: number;
  category?: string;
  tags?: string[];
  isOutOfStock?: boolean;
  hasAdditionalIcons?: boolean;
}

const STORAGE_KEY = 'shop_products_v1';

@Injectable({
  providedIn: 'root',
})
export class Productos {
  private products: ProductAdmin[] = [];

  constructor() {
    this.load();
    if (!this.products || this.products.length === 0) {
      this.seedDefaults();
      this.save();
    }
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.products));
    try {
      window.dispatchEvent(new CustomEvent('productos:changed'));
    } catch (e) {
      
    }
  }

  private load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      this.products = raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Failed to load products from storage', e);
      this.products = [];
    }
  }

  private seedDefaults() {
  this.products = [
    { id: 1, name: 'PLAQUITA GRABADA DORADA-PLATEADA', price: 35.0, image: 'https://i.imgur.com/8skZDoc.jpeg', rating: 4, category: 'Accesorios', tags: ['Collares','Alta calidad'] },
    { id: 2, name: 'COLLAR GRABADO', price: 25.0, image: 'https://i.imgur.com/i2FFa9r.jpeg', rating: 5, hasAdditionalIcons: true, category: 'Accesorios', tags: ['Collares','Grabado'] },
    { id: 3, name: 'COLLARES GRANDES', price: 20.0, image: 'https://i.imgur.com/VSt0OrX.jpeg', rating: 4, isOutOfStock: true, category: 'Accesorios', tags: ['Collares','Grande'] },

    { id: 4, name: 'Juguete mordedor para perro', price: 15.0, image: '', rating: 4, category: 'Juguetes', tags: ['Perro','Mordedor'] },
    { id: 5, name: 'Arena para gato 10kg', price: 65.0, image: '', rating: 5, category: 'Higiene', tags: ['Gato','Arena'] },
    { id: 6, name: 'Comida premium para perro 5kg', price: 120.0, image: '', rating: 4, category: 'Alimentos', tags: ['Perro','Comida'] },
    { id: 7, name: 'Cama acolchada para gato', price: 80.0, image: '', rating: 5, category: 'Accesorios', tags: ['Gato','Cama'] },
    { id: 8, name: 'Shampoo antipulgas', price: 30.0, image: '', rating: 4, category: 'Higiene', tags: ['Perro','Shampoo'] },
    { id: 9, name: 'Correa extensible', price: 40.0, image: '', rating: 5, category: 'Accesorios', tags: ['Perro','Correa'] },
    { id: 10, name: 'Snacks para gato', price: 22.0, image: '', rating: 4, category: 'Alimentos', tags: ['Gato','Snacks'] }
  ];
}


  getAll(): ProductAdmin[] {
    return JSON.parse(JSON.stringify(this.products));
  }

  add(product: Omit<ProductAdmin, 'id'>): ProductAdmin {
    const id = this.nextId();
    const p: ProductAdmin = { id, ...product };
    this.products.push(p);
    this.save();
    return p;
  }

  update(updated: ProductAdmin): boolean {
    const idx = this.products.findIndex(p => p.id === updated.id);
    if (idx === -1) return false;
    this.products[idx] = { ...updated };
    this.save();
    return true;
  }

  remove(id: number): boolean {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) return false;
    this.products.splice(idx, 1);
    this.save();
    return true;
  }

  private nextId(): number {
    return this.products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  }

} 
