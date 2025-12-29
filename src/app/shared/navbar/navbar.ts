import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private router: Router) {}

  navegar(ruta: string): void {
    this.router.navigate([ruta]).then(() => {
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
