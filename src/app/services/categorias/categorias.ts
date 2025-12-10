import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Categorias {
  getCategorias(){
    return [
      "hola"
    ]
  }

  getBoolean(){
    return null; 
  }
}
