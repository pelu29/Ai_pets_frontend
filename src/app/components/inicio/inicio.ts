import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sede, SEDES } from '../../shared/sedes.data';

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
export class Inicio implements OnInit {
  showSedeModal = false;
  selectedProduct: Product | null = null;
  selectedSede: Sede | null = null;

  sedes: Sede[] = SEDES;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Intentar leer un valor predeterminado de la página (atributo data-default-sede-phone en body o en cualquier elemento)
    let defaultPhone: string | null = null;
    const el = document.querySelector('[data-default-sede-phone]') as HTMLElement | null;
    if (el) defaultPhone = el.getAttribute('data-default-sede-phone');
    if (!defaultPhone) defaultPhone = document.body.getAttribute('data-default-sede-phone');

    // También permitir parámetro URL ?sede=phone
    if (!defaultPhone) {
      const params = new URLSearchParams(window.location.search);
      defaultPhone = params.get('sede');
    }

    if (defaultPhone) {
      const found = this.sedes.find(s => s.phone === defaultPhone || s.name === defaultPhone);
      this.selectedSede = found || this.sedes[0] || null;
    } else {
      this.selectedSede = this.sedes[0] || null;
    }
  }

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

  // Abrir modal para solicitar un pedido general (sin producto)
  openPedido(): void {
    this.selectedProduct = null;
    // asegurar que haya una sede seleccionada por defecto
    if (!this.selectedSede && this.sedes && this.sedes.length) {
      this.selectedSede = this.sedes[0];
    }
    this.showSedeModal = true;
  }

  closeModal() {
    this.showSedeModal = false;
    this.selectedProduct = null;
    this.selectedSede = null;
  }

  confirmSede() {
    if (this.selectedSede) {
      let message = '';
      if (this.selectedProduct) {
        message = `Hola que tal, quiero comprar: ${this.selectedProduct.name} - S/ ${this.selectedProduct.price?.toFixed(2) ?? ''} - Sede: ${this.selectedSede.name}`;
      } else {
        message = `Hola AIPets, deseo solicitar un pedido. Sede: ${this.selectedSede.name}`;
      }
      const url = `https://wa.me/${this.selectedSede.phone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      this.closeModal();
    }
  }
} 
