import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Nosotros } from './components/nosotros/nosotros';
import { Contacto } from './components/contacto/contacto';
import { ListaDeseos } from './components/lista-deseos/lista-deseos';
import { Carrito } from './components/carrito/carrito';
import { Pago } from './components/pago/pago';
import { ShopUno } from './components/shop-uno/shop-uno';
import { Panel } from './components/panel/panel';
import { LoginPanel } from './components/login-panel/login-panel';

export const routes: Routes = [
    {path: '', pathMatch:'full', component:Inicio},
    {path: 'inicio', component:Inicio},
    {path: 'nosotros', component:Nosotros},
    {path: 'contacto', component:Contacto},
    {path: 'lista-deseos', component: ListaDeseos},
    {path: 'carrito', component: Carrito},
    {path: 'pago', component: Pago},
    {path: 'shop-uno', component:ShopUno},
    {path: 'panel', component:Panel},
    {path: 'login', component: LoginPanel}
];
