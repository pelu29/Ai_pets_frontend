import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { PRODUCTS_MOCK } from '../../mock/products.mock';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos-list.html',
  styleUrls: ['./productos-list.css']
})
export class ProductListComponent {

  products: Product[] = PRODUCTS_MOCK;

  categories = ['Accesorios', 'Juguetes', 'Ropa'];
  tags = ['Collares', 'Juguetes', 'Ropa', 'Perros'];

  selectedCategory: string | null = null;
  selectedTags: string[] = [];
  selectedRating = 0;

  minPrice = 0;
  maxPrice = 500;
  selectedPrice = 500;

  sortBy = 'latest';

  openFilters = {
    categories: true,
    price: true,
    rating: true,
    tags: true
  };

  toggleFilter(filter: keyof typeof this.openFilters) {
    this.openFilters[filter] = !this.openFilters[filter];
  }

  /* ===== TAGS ===== */
  toggleTag(tag: string) {
    this.selectedTags.includes(tag)
      ? this.selectedTags = this.selectedTags.filter(t => t !== tag)
      : this.selectedTags.push(tag);
  }

  /* ===== FILTRO ===== */
  get filteredProducts(): Product[] {
    let result = [...this.products];

    if (this.selectedCategory) {
      result = result.filter(p => p.category === this.selectedCategory);
    }

    result = result.filter(p => p.price <= this.selectedPrice);

    if (this.selectedRating > 0) {
      result = result.filter(p => p.rating >= this.selectedRating);
    }

    if (this.selectedTags.length) {
      result = result.filter(p =>
        this.selectedTags.some(tag => p.tags.includes(tag))
      );
    }

    switch (this.sortBy) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }

  get priceProgress(): string {
    return `${((this.selectedPrice - this.minPrice) /
      (this.maxPrice - this.minPrice)) * 100}%`;
  }

  /* ===== LIMPIAR FILTROS ===== */
clearFilters(): void {
  this.selectedCategory = null;
  this.selectedTags = [];
  this.selectedRating = 0;
  this.selectedPrice = this.maxPrice;
  this.sortBy = 'latest';
}

}
