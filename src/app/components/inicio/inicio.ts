import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Sede {
  name: string;
  phone: string;
  address: string;
}

interface Product {
  name: string;
  price: number;
}

@Component({
  selector: 'app-inicio',
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  showSedeModal = false;
  selectedProduct: Product | null = null;
  selectedSede: Sede | null = null;

  sedes: Sede[] = [
    { name: 'La Perla', phone: '51992071210', address: 'Av. José Galvez 1284' },
    { name: 'San Miguel', phone: '51994054680', address: 'Calle Pedro Chamochumbi 217' },
    { name: 'San José', phone: '51908878260', address: 'Av. San Jose 396' }
  ];

  constructor(private router: Router) {}

  abrirMapa(ruta:string): void {
    const url = ruta;
    window.open(url, '_blank');
  }

  abrirWhatsapp(phone: string): void {
    const url = `https://wa.me/${phone}`;
    window.open(url, '_blank');
  }

  irANosotros(): void {
    this.router.navigate(['nosotros']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navegar(ruta:string): void{
    this.router.navigate([`/${ruta}`])
  }

  openWhatsapp(productName: string, productPrice: number) {
    this.selectedProduct = { name: productName, price: productPrice };
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
