import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Productos } from '../../services/productos/productos';

interface Category {
  name: string;
  count: number;
  checked: boolean;

}
interface Tag {
  name: string;
  selected: boolean;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category?: string;
  tags?: string[];
  isOutOfStock?: boolean;
  hasAdditionalIcons?: boolean;
}

@Component({
  selector: 'app-shop-uno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shop-uno.html',
  styleUrl: './shop-uno.css'
})
export class ShopUno implements OnInit { 

  // categorías y etiquetas se inicializan dinámicamente a partir de los productos
  categories: Category[] = [];
  popularTags: Tag[] = [];
  showOnlyAvailable = false;

  products: Product[] = [];

  constructor(private productosService: Productos) { }

  ngOnInit(): void {
    this.loadProducts();
    window.addEventListener('productos:changed', () => this.loadProducts());
  }

  loadProducts() {
    this.products = this.productosService.getAll().map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      rating: p.rating ?? 4,
      category: p.category,
      tags: p.tags ?? [],
      isOutOfStock: p.isOutOfStock,
      hasAdditionalIcons: p.hasAdditionalIcons
    }));

    this.initFilters();
  }

  sortOptions = ['El último', 'Precio: Bajo a Alto', 'Precio: Alto a Bajo'];
  selectedSortOption = this.sortOptions[0];
  minPrice = 0;
  maxPrice = 1500;
  
  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  initFilters() {
    // crear lista de categorías con conteos a partir de los productos
    const catMap: Record<string, number> = {};
    const tagMap: Record<string, number> = {};

    this.products.forEach(p => {
      const c = p.category ?? 'Sin categoría';
      catMap[c] = (catMap[c] || 0) + 1;
      (p.tags || []).forEach(t => tagMap[t] = (tagMap[t] || 0) + 1);
    });

    this.categories = Object.keys(catMap).map(name => ({ name, count: catMap[name], checked: false }));

    // tags ordenadas por frecuencia
    this.popularTags = Object.keys(tagMap)
      .sort((a, b) => tagMap[b] - tagMap[a])
      .slice(0, 12)
      .map(name => ({ name, selected: false }));

    // ajustar rangos de precio con base en productos
    const prices = this.products.map(p => p.price);
    this.minPrice = Math.min(...prices);
    this.maxPrice = Math.max(...prices);
  }

  get filteredProducts(): Product[] {
    let results = this.products.filter(p => p.price >= this.minPrice && p.price <= this.maxPrice);

    const activeCategories = this.categories.filter(c => c.checked).map(c => c.name);
    if (activeCategories.length) {
      results = results.filter(p => activeCategories.includes(p.category ?? ''));
    }

    const activeTags = this.popularTags.filter(t => t.selected).map(t => t.name);
    if (activeTags.length) {
      results = results.filter(p => (p.tags || []).some(tag => activeTags.includes(tag)));
    }

    if (this.showOnlyAvailable) {
      results = results.filter(p => !p.isOutOfStock);
    }

    // orden
    if (this.selectedSortOption === 'Precio: Bajo a Alto') {
      results = results.sort((a, b) => a.price - b.price);
    } else if (this.selectedSortOption === 'Precio: Alto a Bajo') {
      results = results.sort((a, b) => b.price - a.price);
    } else {
      // 'El último' por defecto: orden descendente por id
      results = results.sort((a, b) => b.id - a.id);
    }

    return results;
  }

  toggleTag(tag: Tag) {
    tag.selected = !tag.selected;
  }

  onFiltersChanged() {
    // placeholder por si queremos ejecutar lógica adicional al cambiar filtros
  }

  openWhatsapp(product: any) {
    const phone = '51992071210'; // +51 992 071 210
    const message = `Hola que tal, quiero comprar: ${product.name} - S/ ${product.price?.toFixed(2) ?? ''}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

}