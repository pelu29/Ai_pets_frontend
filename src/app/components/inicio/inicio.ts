import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
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
} 
