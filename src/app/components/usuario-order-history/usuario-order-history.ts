import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Pedido {
  id: string;
  fecha: string;
  total: string;
  estado: string;
}

@Component({
  selector: 'app-usuario-order-history',
  templateUrl: './usuario-order-history.html',
  imports: [CommonModule],
  styleUrls: ['./usuario-order-history.css']
})
export class UsuarioOrderHistoryComponent implements OnInit {

  historialPedidos: Pedido[] = [
    { id: '#9645', fecha: '4 April, 2021', total: '$135.00 (5 Products)', estado: 'Processing' },
    { id: '#5045', fecha: '27 Mar, 2021', total: '$25.00 (1 Product)', estado: 'on the way' },
    { id: '#5033', fecha: '20 Mar, 2021', total: '$250.00 (4 Products)', estado: 'Completed' },
    { id: '#4566', fecha: '18 Mar, 2021', total: '$35.00 (1 Product)', estado: 'Completed' },
    { id: '#4452', fecha: '18 Mar, 2021', total: '$578.00 (13 Products)', estado: 'Completed' },
    { id: '#0991', fecha: '10 Mar, 2021', total: '$345.00 (7 Products)', estado: 'Completed' },
    { id: '#2035', fecha: '5 Mar, 2021', total: '$560.00 (2 Products)', estado: 'Completed' },
    { id: '#1374', fecha: '27 Feb, 2021', total: '$560.00 (2 Products)', estado: 'Completed' },
    { id: '#7701', fecha: '25 Feb, 2021', total: '$560.00 (2 Products)', estado: 'Completed' },
    { id: '#4045', fecha: '24 Feb, 2021', total: '$23.00 (1 Products)', estado: 'Completed' },
    { id: '#5948', fecha: '20 Feb, 2021', total: '$23.00 (1 Products)', estado: 'Completed' },
    { id: '#1577', fecha: '12 Oct, 2020', total: '$32.00 (1 Products)', estado: 'Completed' }
  ];

opcionesNavegacion = [
    { nombre: 'Dashboard', activo: false, icono: 'fas fa-th-large' },
    { nombre: 'Historial de ordenes', activo: true, icono: 'fas fa-history' },
    { nombre: 'Lista de deseos', activo: false, icono: 'fas fa-heart' },
    { nombre: 'Carrito de compras', activo: false, icono: 'fas fa-shopping-cart' },
    { nombre: 'Ajustes', activo: false, icono: 'fas fa-cog' },
    { nombre: 'Cerrar sesión', activo: false, icono: 'fas fa-sign-out-alt' }
  ];

  paginas = [1, 2, 3];
  paginaActual = 1;

  constructor() { }

  ngOnInit(): void {
  }

  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
  }

  seleccionarOpcion(opcionSeleccionada: any) {
    this.opcionesNavegacion.forEach(opcion => {
      opcion.activo = opcion === opcionSeleccionada;
    });
  }
}