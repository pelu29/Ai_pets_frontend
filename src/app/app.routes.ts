import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Nosotros } from './components/nosotros/nosotros';
import { Contacto } from './components/contacto/contacto';
import { UsuarioDetallesComponent } from './components/usuario-detalles/usuario-detalles';
import { UsuarioOrderHistoryComponent } from './components/usuario-order-history/usuario-order-history';
import { UsuarioOrderDetailsComponent } from './components/usuario-order-details/usuario-order-details';
import { UsuarioSettingsComponent } from './components/usuario-setting/usuario-setting';

export const routes: Routes = [
    {path: 'inicio', component:Inicio},
    {path: 'nosotros', component:Nosotros},
    {path: 'contacto', component:Contacto},
    {path: 'usuario-detalles', component:UsuarioDetallesComponent}, 
    {path: 'usuario-order-history', component:UsuarioOrderHistoryComponent},
    {path: 'usuario-order-details', component:UsuarioOrderDetailsComponent},
    {path: 'usuario-settings', component:UsuarioSettingsComponent},
];
    