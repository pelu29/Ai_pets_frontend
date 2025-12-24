import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

interface Category {
  name: string;
  count: number;
  checked: boolean;

}
interface Tag {
  name: string;
  selected: boolean;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  isOutOfStock?: boolean;
  hasAdditionalIcons?: boolean;
}

@Component({
  selector: 'app-shop-uno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shop-uno.html',
  styleUrl: './shop-uno.css'
})
export class ShopUno implements OnInit { 

  categories: Category[] = [
    { name: 'Medicamentos y Tratamientos', count: 134, checked: false },
    { name: 'Accesorios', count: 110, checked: true },
    { name: 'Antiparasitarios', count: 54, checked: false },
    { name: 'Vitaminas y Suplementos', count: 47, checked: false },
    { name: 'Descartables', count: 45, checked: false },
    { name: 'Alimentos', count: 30, checked: false },
    { name: 'Higiene y Cuidado', count: 15, checked: false }
  ];

  popularTags: Tag[] = [
    { name: 'Juguetes', selected: false },
    { name: 'Collares', selected: true },
    { name: 'Transporte', selected: false },
    { name: 'Ropa', selected: false },
    { name: 'Camas', selected: false },
    { name: 'Económicos', selected: false },
    { name: 'Meds', selected: false },
    { name: 'Snacks', selected: false },
    { name: 'Alta calidad', selected: false },
    { name: 'Higiene', selected: false },
    { name: 'Arneses', selected: false },
    { name: 'Antipulgas', selected: false }
  ];

products: Product[] = [
    { id: 1, name: 'PLAQUITA GRABADA DORADA-PLATEADA', price: 35.00, image: 'https://i.imgur.com/8skZDoc.jpeg', rating: 4 },
    { id: 2, name: 'COLLAR GRABADO', price: 25.00, image: 'https://i.imgur.com/i2FFa9r.jpeg', rating: 5, hasAdditionalIcons: true },
    { id: 3, name: 'COLLARES GRANDES', price: 20.00, image: 'https://i.imgur.com/VSt0OrX.jpeg', rating: 4, isOutOfStock: true },
    { id: 4, name: 'PELOTA GRANDE', price: 18.00, image: 'https://i.imgur.com/RuyVBoN.jpeg', rating: 3 },
    { id: 5, name: 'POLERA DINO TALLA 2', price: 25.00, image: 'https://i.imgur.com/brSXPof.jpeg', rating: 4 },
    { id: 6, name: 'PLACA DE IDENTIFICACIÓN ALUMINIO - GATOS', price: 25.00, image: 'https://i.imgur.com/FmZBhri.jpeg', rating: 5 },
    { id: 7, name: 'TRANSPORTADOR KENNEL CHICO', price: 80.00, image: 'https://i.imgur.com/4bHLX2d.jpeg', rating: 4 },
    { id: 8, name: 'IMPERMEABLE ROSADO METÁLICO T3', price: 35.00, image: 'https://i.imgur.com/qzVu88M.jpeg', rating: 4 },
    { id: 9, name: 'VESTIDO ABEJITA TALLA 4', price: 40.00, image: 'https://i.imgur.com/kGbNovW.jpeg', rating: 3 },
    { id: 10, name: 'FAJA HEMBRA TALLA 2', price: 36.00, image: 'https://i.imgur.com/cimJAq6.jpeg', rating: 4 },
    { id: 11, name: 'FAJA MACHO TALLA 0 (ALGODÓN)', price: 46.00, image: 'https://i.imgur.com/OVDpSEF.jpeg', rating: 5 },
    { id: 12, name: 'ARENA DE GATO SOMOCAT 5KG', price: 28.00, image: 'https://i.imgur.com/yrqz23w.jpeg', rating: 5, hasAdditionalIcons: true },
    { id: 13, name: 'SOFA CAMA T-L', price: 60.00, image: 'https://i.imgur.com/1oRXRh6.jpeg', rating: 4 },
    { id: 14, name: 'ROPA NAVIDEÑA TALLA 4', price: 25.00, image: 'https://i.imgur.com/5RzEk2G.jpeg', rating: 5 },
    { id: 15, name: 'PECHERA REYCAN TALLA "M"', price: 50.00, image: 'https://i.imgur.com/De1zJll.jpeg', rating: 4 }
  ];

  sortOptions = ['El último', 'Precio: Bajo a Alto', 'Precio: Alto a Bajo'];
  selectedSortOption = this.sortOptions[0];
  minPrice = 50;
  maxPrice = 1500;
  
  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  constructor() { }

  ngOnInit(): void {
  }

}