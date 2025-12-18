import { Producto } from '../models/producto.model';

export const PRODUCTOS: Producto[] = [
  {
    id: 1,
    nombre: 'Croquetas Premium Adulto 15kg',
    precio: 180,
    imagen: 'assets/img/croquetas-adulto.jpg',
    stock: 25,
    disponible: true,
    categoria: 'Alimentos',
    descripcion: 'Alimento balanceado para perros adultos'
  },
  {
    id: 2,
    nombre: 'Croquetas Cachorro 10kg',
    precio: 150,
    imagen: 'assets/img/croquetas-cachorro.jpg',
    stock: 18,
    disponible: true,
    categoria: 'Alimentos',
    descripcion: 'Especial para el crecimiento del cachorro'
  },
  {
    id: 3,
    nombre: 'Hueso de Juguete Resistente',
    precio: 25,
    imagen: 'assets/img/hueso-juguete.jpg',
    stock: 40,
    disponible: true,
    categoria: 'Juguetes',
    descripcion: 'Juguete de goma resistente para masticar'
  },
  {
    id: 4,
    nombre: 'Pelota Interactiva',
    precio: 20,
    imagen: 'assets/img/pelota.jpg',
    stock: 0,
    disponible: false,
    categoria: 'Juguetes',
    descripcion: 'Pelota para juego interactivo'
  },
  {
    id: 5,
    nombre: 'Cama Acolchada Mediana',
    precio: 95,
    imagen: 'assets/img/cama-perro.jpg',
    stock: 7,
    disponible: true,
    categoria: 'Accesorios',
    descripcion: 'Cama cómoda y lavable para perros medianos'
  },
  {
    id: 6,
    nombre: 'Collar Ajustable',
    precio: 18,
    imagen: 'assets/img/collar.jpg',
    stock: 30,
    disponible: true,
    categoria: 'Accesorios',
    descripcion: 'Collar resistente con hebilla ajustable'
  },
  {
    id: 7,
    nombre: 'Correa Nylon Reforzada',
    precio: 28,
    imagen: 'assets/img/correa.jpg',
    stock: 22,
    disponible: true,
    categoria: 'Accesorios',
    descripcion: 'Correa fuerte para paseos diarios'
  },
  {
    id: 8,
    nombre: 'Shampoo Antipulgas',
    precio: 35,
    imagen: 'assets/img/shampoo.jpg',
    stock: 15,
    disponible: true,
    categoria: 'Higiene',
    descripcion: 'Protección contra pulgas y garrapatas'
  },
  {
    id: 9,
    nombre: 'Premios Dentales',
    precio: 22,
    imagen: 'assets/img/premios.jpg',
    stock: 50,
    disponible: true,
    categoria: 'Snacks',
    descripcion: 'Ayuda a la limpieza dental'
  },
  {
    id: 10,
    nombre: 'Plato Antideslizante',
    precio: 15,
    imagen: 'assets/img/plato.jpg',
    stock: 12,
    disponible: true,
    categoria: 'Accesorios',
    descripcion: 'Plato metálico con base antideslizante'
  }
];
