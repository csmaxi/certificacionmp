"use client";

import React, { useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

interface MercadoPagoButtonProps {
  preferenceId: string | null;
}

const MercadoPagoButton: React.FC<MercadoPagoButtonProps> = ({ preferenceId }) => {
  const publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY;

  if (!publicKey) {
    console.error("NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY no está definido en las variables de entorno.");
    return <div>Error: Public key no definido.</div>;
  }

  useEffect(() => {
    console.log("Public Key:", publicKey); // Depuración
    initMercadoPago(publicKey, { locale: "es-AR" });
  }, [publicKey]);

  if (!preferenceId) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Wallet initialization={{ preferenceId }} />
    </div>
  );
};

export default MercadoPagoButton;