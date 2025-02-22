// src/app/cart/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import MercadoPagoButton from "../../components/MercadoPagoButton";

export default function CartPage() {
  const { cart, total } = useCart();
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  useEffect(() => {
    const createPreference = async () => {
      try {
        const response = await fetch("/api/create-preference", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cart.map((item) => ({
              title: item.name,
              unit_price: item.price,
              quantity: 1,
            })),
          }),
        });
        const { id } = await response.json();
        setPreferenceId(id);
      } catch (error) {
        console.error("Error creating preference:", error);
      }
    };

    if (cart.length > 0) {
      createPreference();
    } else {
      setPreferenceId(null); // Limpiar el preferenceId si el carrito está vacío
    }
  }, [cart]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cart.length > 0 ? (
        <MercadoPagoButton preferenceId={preferenceId} />
      ) : (
        <div>No hay productos en el carrito.</div>
      )}
    </div>
  );
}