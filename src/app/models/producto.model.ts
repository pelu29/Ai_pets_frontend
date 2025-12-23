export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  stock: number;
  disponible: boolean;

  descripcion?: string;
  categoria?: string;
}
