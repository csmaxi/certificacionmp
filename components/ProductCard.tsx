// src/components/ProductCard.tsx
import React from 'react';
import { Product } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-700">${product.price}</p>
      <button
        onClick={() => onAddToCart(product)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;