import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  currentSection = 'Inicio';
  currentIcon = 'fa-home';
  searchQuery = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Inicializar la sección actual a partir de la ruta activa
    const url = this.router.url.replace(/^\/+/, '');
    const route = url.split('/')[0] || 'inicio';
    this.currentSection = this.labelForRoute(route);
    this.currentIcon = this.iconForRoute(route);
  }

  private labelForRoute(ruta: string): string {
    const map: Record<string, string> = {
      'inicio': 'Inicio',
      'shop-uno': 'Tienda',
      'nosotros': 'Nosotros',
      'contacto': 'Contáctanos',
    };
    return map[ruta] || (ruta ? ruta.charAt(0).toUpperCase() + ruta.slice(1) : 'Inicio');
  }

  private iconForRoute(ruta: string): string {
    const icons: Record<string, string> = {
      'inicio': 'fa-home',
      'shop-uno': 'fa-store',
      'nosotros': 'fa-users',
      'contacto': 'fa-envelope',
    };
    return icons[ruta] || 'fa-circle';
  }

  buscar(): void {
    if (this.searchQuery.trim()) {
      // Navegar a shop-uno con el parámetro de búsqueda
      this.router.navigate(['/shop-uno'], { queryParams: { buscar: this.searchQuery } }).then(() => {
        this.searchQuery = '';
      });
    }
  }

  navegar(ruta: string): void {
    this.router.navigate([ruta]).then(() => {
      // Actualizar la etiqueta e icono de la sección actual
      this.currentSection = this.labelForRoute(ruta);
      this.currentIcon = this.iconForRoute(ruta);

      // Cerrar menú hamburguesa si está abierto (móvil)
      const checkbox = document.getElementById('nav-toggle') as HTMLInputElement | null;
      if (checkbox && checkbox.checked) {
        checkbox.checked = false;
      }

      // Cerrar panel de filtros móviles si está abierto
      const mobileFilters = document.getElementById('mobileFilters') as HTMLDetailsElement | null;
      if (mobileFilters && mobileFilters.open) {
        mobileFilters.removeAttribute('open');
      }
    });
  }
}
