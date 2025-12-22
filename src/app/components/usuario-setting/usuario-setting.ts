import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface OpcionNavegacion {
  nombre: string;
  activo: boolean;
  icono: string;
}

@Component({
  selector: 'app-usuario-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-setting.html',
  styleUrls: ['./usuario-setting.css']
})
export class UsuarioSettingsComponent implements OnInit {

  opcionesNavegacion: OpcionNavegacion[] = [
    { nombre: 'Dashboard',          activo: false, icono: 'fa-th-large' },
    { nombre: 'Historial de ordenes', activo: false, icono: 'fa-history' },
    { nombre: 'Lista de deseos',    activo: false, icono: 'fa-heart' },
    { nombre: 'Carrito de compras', activo: false, icono: 'fa-shopping-cart' },
    { nombre: 'Ajustes',            activo: true,  icono: 'fa-cog' }, 
    { nombre: 'Cerrar sesión',      activo: false, icono: 'fa-sign-out-alt' }
  ];
  account = {
    firstName: 'Dianne',
    lastName: 'Russell',
    email: 'dianne.russell@gmail.com',
    phone: '(603) 555-0123',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  };

  shipping = {
    firstName: 'Dianne',
    lastName: 'Dianne', 
    company: 'Zakirsoft',
    street: '4140 Parl',
    country: 'United States',
    state: 'Washington DC',
    zip: '20033',
    email: 'dianne.russell@gmail.com',
    phone: '(603) 555-0123'
  };

  constructor() { }

  ngOnInit(): void {
  }

  seleccionarOpcion(opcionSeleccionada: OpcionNavegacion) {
    this.opcionesNavegacion.forEach(op => op.activo = false);
    opcionSeleccionada.activo = true;
  }
}