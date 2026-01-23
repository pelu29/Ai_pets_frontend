import { Component, OnInit, HostListener } from '@angular/core';
import { SEDES } from '../sedes.data';
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
  // estado para el menú emergente de sedes
  showSedeMenu = false;
  sedes: { name: string; phone: string; address?: string }[] = [];
  selectedPhone = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Inicializar la sección actual a partir de la ruta activa
    const url = this.router.url.replace(/^\/+/, '');
    const route = url.split('/')[0] || 'inicio';
    this.currentSection = this.labelForRoute(route);
    this.currentIcon = this.iconForRoute(route);
    // cargar sedes compartidas
    try {
      this.sedes = SEDES as any;
    } catch (e) {
      // silenciar si falla
    }
    if (this.sedes && this.sedes.length) {
      this.selectedPhone = this.sedes[0].phone;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(_: Event): void {
    this.showSedeMenu = false;
  }

  toggleSedeMenu(event?: Event): void {
    if (event) { event.stopPropagation(); }
    this.showSedeMenu = !this.showSedeMenu;
  }

  openWhatsappFor(phone: string): void {
    const text = 'Hola AIPets, Me contacto desde la página web. Quisiera consultar sobre sus servicios veterinarios';
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    this.showSedeMenu = false;
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
