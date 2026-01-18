import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../services/products/products';

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
  image: any;
  rating: number;
  category?: string;
  tags?: string[];
  isOutOfStock?: boolean;
  hasAdditionalIcons?: boolean;
}

interface Sede {
  name: string;
  phone: string;
  address: string;
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
  searchTerm = '';

  products: Product[] = [];

  // Modal properties
  showSedeModal = false;
  selectedProduct: Product | null = null;
  selectedSede: Sede | null = null;

  sedes: Sede[] = [
    { name: 'La Perla', phone: '51992071210', address: 'Av. José Galvez 1284' },
    { name: 'San Miguel', phone: '51994054680', address: 'Calle Pedro Chamochumbi 217' },
    { name: 'San José', phone: '51908878260', address: 'Av. San Jose 396' }
  ];

  constructor(private productsService: Products, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtener el parámetro de búsqueda de la URL
    this.route.queryParams.subscribe(params => {
      if (params['buscar']) {
        this.searchTerm = params['buscar'];
      }
    });
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getData().subscribe({
      next: (csv) => {
        const apiProducts = this.productsService.csvToJson(csv);

        console.log('CSV Raw:', csv);
        console.log('Productos desde CSV:', apiProducts);

        this.products = apiProducts.map(p => ({
          id: parseInt(String(p.id || p.ID || 0).trim(), 10),
          name: String(p.Nombre || p.nombre || p.name || '').trim(),
          price: parseFloat(String(p.Precio || p.precio || p.price || 0).trim()) || 0,
          image: p.Imagen,
          rating: parseInt(String(p.Rating || p.rating || 4).trim(), 10) || 4,
          category: String(p.Categoria || p.categoria || p.category || '').trim(),
          tags: p.tags ? (typeof p.tags === 'string' ? p.tags.split(',').map((t: string) => t.trim()) : p.tags) : [],
          isOutOfStock: p.isOutOfStock === 'true' || p.isOutOfStock === true,
          hasAdditionalIcons: p.hasAdditionalIcons === 'true' || p.hasAdditionalIcons === true
        }));

        console.log('Productos procesados:', this.products);
        console.log('Imágenes:', this.products.map(p => ({ name: p.name, image: p.image })));
        this.initFilters();
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
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
    const prices = this.products.map(p => p.price).filter(p => !isNaN(p) && p > 0);
    if (prices.length > 0) {
      this.minPrice = Math.min(...prices);
      this.maxPrice = Math.max(...prices);
    } else {
      this.minPrice = 0;
      this.maxPrice = 1500;
    }
  }

  get filteredProducts(): Product[] {
    let results = this.products.filter(p => p.price >= this.minPrice && p.price <= this.maxPrice);

    // Filtrado por búsqueda
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      results = results.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        (p.category && p.category.toLowerCase().includes(searchLower)) ||
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      );
    }

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
    this.selectedProduct = product;
    this.selectedSede = null;
    this.showSedeModal = true;
  }

  closeModal() {
    this.showSedeModal = false;
    this.selectedProduct = null;
    this.selectedSede = null;
  }

  confirmSede() {
    if (this.selectedProduct && this.selectedSede) {
      const message = `Hola que tal, quiero comprar: ${this.selectedProduct.name} - S/ ${this.selectedProduct.price?.toFixed(2) ?? ''} - Sede: ${this.selectedSede.name}`;
      const url = `https://wa.me/${this.selectedSede.phone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      this.closeModal();
    }
  }

}