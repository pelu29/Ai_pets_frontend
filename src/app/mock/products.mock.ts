import { Product } from '../models/product.model';

export const PRODUCTS_MOCK: Product[] = [
  {
    id: 1,
    name: 'Collar grabado premium',
    price: 25,
    rating: 4,
    image: 'images/Bamba.png',
    category: 'Accesorios',
    tags: ['Collares', 'Perros'],
    stock: 12
  },
  {
    id: 2,
    name: 'Collar grande reforzado',
    price: 20,
    rating: 5,
    image: 'images/Bamba.png',
    category: 'Accesorios',
    tags: ['Collares'],
    stock: 0
  },
  {
    id: 3,
    name: 'Pelota resistente',
    price: 18,
    rating: 4,
    image: 'images/123.jpeg',
    category: 'Juguetes',
    tags: ['Juguetes'],
    stock: 25
  },
  {
    id: 4,
    name: 'Polera dinosaurio',
    price: 25,
    rating: 4,
    image: 'images/Bamba.png',
    category: 'Ropa',
    tags: ['Ropa'],
    stock: 6
  },

  {
    id: 5,
    name: 'zz',
    price: 36,
    rating: 3,
    image: 'images/Bamba.png',
    category: 'Ropa',
    tags: ['Ropa'],
    stock: 7
  }

];
