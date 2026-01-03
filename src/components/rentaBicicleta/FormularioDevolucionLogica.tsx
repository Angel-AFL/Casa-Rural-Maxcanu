import { useState } from 'react';
import { devolverBicicleta } from '../../pages/api/sp_devolucion_bicicleta';
import type { DevolucionBiciResponse } from '../../types/global';

// --------------------------------------------------
// ENVÍO DE CORREO AL ADMIN (DEVOLUCIÓN)
// --------------------------------------------------
async function sendAdminEmailDevolucionBici(
  devolucion: DevolucionBiciResponse
) {
  const res = await fetch('/api/send-email-admin-bici-devolucion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(devolucion),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    console.error(
      'Error al enviar correo devolución bici:',
      errorBody.error
    );
    throw new Error('Error al notificar al administrador');
  }
}

// --------------------------------------------------
// LÓGICA DEL FORMULARIO
// --------------------------------------------------
export function useDevolucionBiciLogic() {
  const [folio, setFolio] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [devolucion, setDevolucion] =
    useState<DevolucionBiciResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setIsSuccess(false);
    setDevolucion(null);
    setIsSubmitting(true);

    try {
      const resultado = await devolverBicicleta(folio);

      if (!resultado) {
        throw new Error(
          'Folio no encontrado, ya fue devuelto o no es válido.'
        );
      }

      await sendAdminEmailDevolucionBici(resultado);

      setIsSuccess(true);
      setDevolucion(resultado);
      setFolio('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    folio,
    setFolio,
    error,
    isSuccess,
    isSubmitting,
    devolucion,
    handleSubmit,
  };
}
