import { Component } from '@angular/core';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Productos, ProductAdmin } from '../../services/productos/productos';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgForOf],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel {
  products: ProductAdmin[] = [];
  form: Partial<ProductAdmin> = {};
  formTags: string = '';
  editingId: number | null = null;

  constructor(private productosService: Productos, private auth: AuthService, private router: Router) {
    // bloquear acceso si no está autenticado
    if (!this.auth.isLoggedIn()) {
      // redirigir a login
      this.router.navigate(['/login']);
      return;
    }

    this.loadProducts();
    window.addEventListener('productos:changed', () => this.loadProducts());
  }

  loadProducts() {
    this.products = this.productosService.getAll();
  }

  startAdd() {
    this.form = { name: '', price: 0, image: '', rating: 4, category: '', tags: [], isOutOfStock: false, hasAdditionalIcons: false };
    this.formTags = '';
    this.editingId = null;
  }

  edit(prod: ProductAdmin) {
    this.editingId = prod.id;
    this.form = { ...prod, tags: (prod.tags || []) };
    this.formTags = (prod.tags || []).join(', ');
  }

  onImageSelected(ev: any) {
    const file: File = ev.target.files && ev.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.form.image = String(reader.result || '');
    };
    reader.readAsDataURL(file);
  }

  save() {
    const tagsString = this.formTags || (this.form.tags && Array.isArray(this.form.tags) ? (this.form.tags as string[]).join(', ') : '');
    const tags = tagsString ? tagsString.split(',').map(s => s.trim()).filter(Boolean) : [];
    const payload: Omit<ProductAdmin, 'id'> = {
      name: this.form.name || 'Sin nombre',
      price: Number(this.form.price || 0),
      image: this.form.image || '',
      rating: Number(this.form.rating || 0),
      category: this.form.category || '',
      tags: tags as string[],
      isOutOfStock: !!this.form.isOutOfStock,
      hasAdditionalIcons: !!this.form.hasAdditionalIcons
    };

    if (this.editingId) {
      const updated: ProductAdmin = { id: this.editingId, ...payload };
      this.productosService.update(updated);
    } else {
      this.productosService.add(payload);
    }

    this.loadProducts();
    this.form = {};
    this.editingId = null;
  }

  cancel() {
    this.form = {};
    this.editingId = null;
  }

  remove(prod: ProductAdmin) {
    if (!confirm(`Eliminar "${prod.name}"?`)) return;
    this.productosService.remove(prod.id);
    this.loadProducts();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

} 
