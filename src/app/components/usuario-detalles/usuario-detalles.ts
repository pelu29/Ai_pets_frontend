import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Pedido {
  id: string;
  fecha: string;
  total: string;
  estado: string;
}

interface OpcionNavegacion {
  nombre: string;
  activo: boolean;
  icono: string; 
}

@Component({
  selector: 'app-usuario-detalles',
  imports: [CommonModule],
  templateUrl: './usuario-detalles.html',
  styleUrls: ['./usuario-detalles.css']
})
export class UsuarioDetallesComponent implements OnInit {

  usuario = {
    nombre: 'Mateo Salazar',
    alias: 'Alias Doctor',
    rol: 'Customer',
    fotoUrl: 'https://i.pravatar.cc/150?img=68', 
    email: 'doctor.mateo@gmail.com',
    telefono: '(67) 555-0110',
    direccionEnvio: {
      calle: '4140 Parker Rd. Allentown, San Juan',
      pais: 'de Lurhashington' 
    }
  };

  historialPedidos: Pedido[] = [
    { id: '#738', fecha: '8 Sep, 2020', total: '$135.00 (5 Products)', estado: 'Processing' },
    { id: '#703', fecha: '24 May, 2020', total: '$25.00 (1 Product)', estado: 'on the way' },
    { id: '#130', fecha: '22 Oct, 2020', total: '$250.00 (4 Products)', estado: 'Completed' },
    { id: '#561', fecha: '1 Feb, 2020', total: '$35.00 (1 Products)', estado: 'Completed' },
    { id: '#536', fecha: '21 Sep, 2020', total: '$578.00 (13 Products)', estado: 'Completed' },
    { id: '#492', fecha: '22 Oct, 2020', total: '$345.00 (7 Products)', estado: 'Completed' },
  ];

  opcionesNavegacion: OpcionNavegacion[] = [
    { nombre: 'Dashboard', activo: true, icono: 'fa-th-large' },
    { nombre: 'Historial de ordenes', activo: false, icono: 'fa-history' },
    { nombre: 'Lista de deseos', activo: false, icono: 'fa-heart' },
    { nombre: 'Carrito de compras', activo: false, icono: 'fa-shopping-cart' },
    { nombre: 'Ajustes', activo: false, icono: 'fa-cog' },
    { nombre: 'Cerrar sesión', activo: false, icono: 'fa-sign-out-alt' }
  ];

  constructor() { }

  ngOnInit(): void {}

  seleccionarOpcion(opcionSeleccionada: OpcionNavegacion) {
    this.opcionesNavegacion.forEach(opcion => {
      opcion.activo = opcion === opcionSeleccionada;
    });
  }
}