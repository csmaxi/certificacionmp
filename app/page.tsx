'use client';

import React, { useState, useEffect } from 'react';
import MercadoPagoButton from '../components/MercadoPagoButton';

const product = {
  id: '1234',
  name: 'Dispositivo móvil de comercio electrónico',
  price: 5000,
  image: 'https://www.example.com/image.jpg',
};

export default function Home() {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  useEffect(() => {
    const createPreference = async () => {
      try {
        const response = await fetch('/api/create-preference', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: [
              {
                id: product.id,
                title: product.name,
                description: product.name,
                picture_url: product.image,
                quantity: 1,
                unit_price: product.price,
              },
            ],
          }),
        });

        const data = await response.json();
        console.log("Preference ID:", data.id); // Depuración
        setPreferenceId(data.id);
      } catch (error) {
        console.error('Error creating preference:', error);
      }
    };

    createPreference();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-orange-300">
      <h1 className="text-2xl font-bold mb-4">Mi E-commerce</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
          <p className="text-lg font-bold">${product.price}</p>
        </div>
        <div>
          {preferenceId && <MercadoPagoButton preferenceId={preferenceId} />}
        </div>
      </div>
    </div>
  );
}