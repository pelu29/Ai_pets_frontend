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
    styleUrls: ['./shop-uno.css']
  })
export class ShopUnoComponent implements OnInit { 

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
    { id: 1, name: 'PLAQUITA GRABADA DORADA-PLATEADA', price: 36.00, image: 'https://img.freepik.com/free-photo/golden-dog-tag-isolated_125540-1267.jpg', rating: 4 },
    { id: 2, name: 'COLLAR GRABADO', price: 25.00, image: 'https://img.freepik.com/free-photo/red-leather-dog-collar_125540-1268.jpg', rating: 5, hasAdditionalIcons: true },
    { id: 3, name: 'COLLARES GRANDES', price: 20.00, image: 'https://img.freepik.com/free-photo/pet-accessories-concept-dry-food-collars_23-2148949564.jpg', rating: 4, isOutOfStock: true },
    { id: 4, name: 'PELOTA GRANDE', price: 18.00, image: 'https://img.freepik.com/free-photo/blue-ball-isolated_125540-1269.jpg', rating: 3 },
    { id: 5, name: 'POLERA DINO TALLA 2', price: 25.00, image: 'https://img.freepik.com/free-photo/funny-dog-wearing-costume_23-2148984024.jpg', rating: 4 },
    { id: 6, name: 'PLACA DE IDENTIFICACIÓN ALUMINIO - GATOS', price: 25.00, image: 'https://img.freepik.com/free-vector/paw-print-stickers_23-2147502752.jpg', rating: 5 },
    { id: 7, name: 'TRANSPORTADOR KENNEL CHICO', price: 80.00, image: 'https://img.freepik.com/free-photo/pet-carrier-isolated_125540-1270.jpg', rating: 4 },
    { id: 8, name: 'IMPERMEABLE ROSADO METÁLICO T3', price: 35.00, image: 'https://img.freepik.com/free-photo/dog-raincoat-isolated_125540-1271.jpg', rating: 4 },
    { id: 9, name: 'VESTIDO ABEJITA TALLA 4', price: 40.00, image: 'https://img.freepik.com/free-photo/dog-wearing-bee-costume_23-2148984025.jpg', rating: 3 },
    { id: 10, name: 'FAJA HEMBRA TALLA 2', price: 36.00, image: 'https://img.freepik.com/free-photo/dog-clothes-isolated_125540-1272.jpg', rating: 4 },
    { id: 11, name: 'FAJA MACHO TALLA 0 (ALGODÓN)', price: 46.00, image: 'https://img.freepik.com/free-photo/dog-clothes-cotton_125540-1273.jpg', rating: 5 },
    { id: 12, name: 'ARENA DE GATO SOMOCAT 5KG', price: 28.00, image: 'https://img.freepik.com/free-photo/cat-litter-packaging_125540-1274.jpg', rating: 5, hasAdditionalIcons: true },
    { id: 13, name: 'SOFA CAMA T-L', price: 80.00, image: 'https://img.freepik.com/free-photo/dog-bed-isolated_125540-1275.jpg', rating: 4 },
    { id: 14, name: 'ROPA NAVIDEÑA TALLA 4', price: 25.00, image: 'https://img.freepik.com/free-photo/dog-christmas-costume_23-2148984026.jpg', rating: 5 },
    { id: 15, name: 'PECHERA REYCAN TALLA "M"', price: 50.00, image: 'https://img.freepik.com/free-photo/dog-harness-isolated_125540-1276.jpg', rating: 4 }
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