import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {

  abrirMapa(ruta:string): void {
    const url = ruta;
    window.open(url, '_blank');
  }
}
