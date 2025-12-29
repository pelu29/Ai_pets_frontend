export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  tags: string[];
  stock: number;
  outOfStock?: boolean;
}
