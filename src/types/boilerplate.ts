export interface Boilerplate {
  id: string;
  name: string;
  description: string;
  price: string;
  priceId: string;
  imageUrl?: string;
  features?: string[];
  demoUrl?: string;
  category?: string;
}

export interface CartItem extends Boilerplate {
  quantity: number;
}
