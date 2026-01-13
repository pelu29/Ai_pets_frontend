import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Productos } from '../../services/productos/productos';

import { Category } from '../../models/category.model';
import { Tag } from '../../models/tag.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-shop-uno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shop-uno.html',
  styleUrls: ['./shop-uno.css']
})
export class ShopUno implements OnInit { 

  // valores aplicados 
  categories: Category[] = [];
  popularTags: Tag[] = [];
  showOnlyAvailable = false;
  minPrice = 0;
  maxPrice = 1500;

  // valores temporales 
  tempCategories: Category[] = [];
  tempTags: Tag[] = [];
  tempShowOnlyAvailable = false;
  tempMinPrice = 0;
  tempMaxPrice = 1500;

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

  
  currentPage = 1;
  pageSize = 9;

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  initFilters() {
    const catMap: Record<string, number> = {};
    const tagMap: Record<string, number> = {};

    this.products.forEach(p => {
      const c = p.category ?? 'Sin categoría';
      catMap[c] = (catMap[c] || 0) + 1;
      (p.tags || []).forEach(t => tagMap[t] = (tagMap[t] || 0) + 1);
    });

    this.categories = Object.keys(catMap).map(name => ({ name, count: catMap[name], checked: false }));
    this.tempCategories = this.categories.map(c => ({ ...c }));

    this.popularTags = Object.keys(tagMap)
      .sort((a, b) => tagMap[b] - tagMap[a])
      .slice(0, 12)
      .map(name => ({ name, selected: false }));
    this.tempTags = this.popularTags.map(t => ({ ...t }));

    const prices = this.products.map(p => p.price);
    if (prices.length) {
      this.minPrice = Math.min(...prices);
      this.maxPrice = Math.max(...prices);
      this.tempMinPrice = this.minPrice;
      this.tempMaxPrice = this.maxPrice;
    }
  }

  //filtrado
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

    if (this.selectedSortOption === 'Precio: Bajo a Alto') {
      results = [...results].sort((a, b) => a.price - b.price);
    } else if (this.selectedSortOption === 'Precio: Alto a Bajo') {
      results = [...results].sort((a, b) => b.price - a.price);
    } else {
      results = [...results].sort((a, b) => b.id - a.id);
    }

    return results;
  }

  // Productos de la pagina
  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  toggleTempTag(tag: Tag) {
    tag.selected = !tag.selected;
  }

  applyFilters() {
    this.minPrice = this.tempMinPrice;
    this.maxPrice = this.tempMaxPrice;
    this.categories = this.tempCategories.map(c => ({ ...c }));
    this.popularTags = this.tempTags.map(t => ({ ...t }));
    this.showOnlyAvailable = this.tempShowOnlyAvailable;
    this.currentPage = 1;
  }

  openWhatsapp(product: Product) {
    const phone = '51992071210';
    const message = `Hola que tal, quiero comprar: ${product.name} - S/ ${product.price?.toFixed(2) ?? ''}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  goToPage(page: number) {
    this.currentPage = page;
  }
}
