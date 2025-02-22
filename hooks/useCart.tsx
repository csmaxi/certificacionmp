// src/hooks/useCart.tsx
import { useState } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const useCart = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return { cart, addToCart, removeFromCart, total };
};

export default useCart;