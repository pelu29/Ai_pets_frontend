export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category?: string;
  tags?: string[];
  isOutOfStock?: boolean;
  hasAdditionalIcons?: boolean;
}
