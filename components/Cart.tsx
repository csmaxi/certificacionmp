// src/components/Cart.tsx
import React from 'react';
import { Product } from '../hooks/useCart';

interface CartProps {
  cart: Product[];
  onRemoveFromCart: (productId: string) => void;
  total: number;
}

const Cart: React.FC<CartProps> = ({ cart, onRemoveFromCart, total }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Carrito</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-2">
          <span>{item.name}</span>
          <span>${item.price}</span>
          <button
            onClick={() => onRemoveFromCart(item.id)}
            className="text-red-500"
          >
            Eliminar
          </button>
        </div>
      ))}
      <div className="mt-4 font-bold">Total: ${total}</div>
    </div>
  );
};

export default Cart;