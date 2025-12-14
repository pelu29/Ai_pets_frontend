import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Nosotros } from './components/nosotros/nosotros';
import { Contacto } from './components/contacto/contacto';

export const routes: Routes = [
    {path: '', pathMatch:'full', component:Inicio},
    {path: 'inicio', component:Inicio},
    {path: 'nosotros', component:Nosotros},
    {path: 'contacto', component:Contacto}
];
