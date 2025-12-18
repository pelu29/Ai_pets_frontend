import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Nosotros } from './components/nosotros/nosotros';
import { Contacto } from './components/contacto/contacto';
import { ListaDeseos } from './components/lista-deseos/lista-deseos';
import { Carrito } from './components/carrito/carrito';
import { Pago } from './components/pago/pago';

export const routes: Routes = [
    {path: '', pathMatch:'full', component:Inicio},
    {path: 'inicio', component:Inicio},
    {path: 'nosotros', component:Nosotros},
    {path: 'contacto', component:Contacto},
    {path: 'lista-deseos', component: ListaDeseos},
    {path: 'carrito', component: Carrito},
    {path: 'pago', component: Pago}
];
