import { useState } from 'react';
import { insertarRentaBicicleta } from '../../pages/api/sp_insertar_renta_bicicleta';
import type { RentaBiciResponse } from '../../types/global';

async function sendAdminEmailBici(renta: RentaBiciResponse) {
  const res = await fetch('/api/send-email-admin-bici', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(renta),
  });

  if (!res.ok) {
    throw new Error('Error al notificar al administrador');
  }
}

async function descargarPdfBici(renta: RentaBiciResponse) {
  const res = await fetch('/api/generate-pdf-bici', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(renta),
  });

  if (!res.ok) {
    throw new Error('No se pudo generar el PDF');
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `Renta_Bicicleta_${renta.folio_generado}.pdf`;
  a.click();

  window.URL.revokeObjectURL(url);
}

export function useRentaBiciLogic() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validarCampos = (): boolean => {
    if (nombre.trim().length < 3) {
      setError('El nombre debe tener al menos 3 letras.');
      return false;
    }

    if (apellido.trim().length < 2) {
      setError('El apellido debe tener al menos 2 letras.');
      return false;
    }

    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(telefono)) {
      setError('El teléfono debe tener exactamente 10 números.');
      return false;
    }

    return true;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setError(null);
  setIsSuccess(false);

  if (!validarCampos()) return;

  setIsSubmitting(true);

  try {
    const renta = await insertarRentaBicicleta(
      nombre,
      apellido,
      telefono
    );

    if (!renta) {
      throw new Error('Respuesta inválida del servidor');
    }

    await sendAdminEmailBici(renta);
    await descargarPdfBici(renta);

    setIsSuccess(true);

    setNombre('');
    setApellido('');
    setTelefono('');
  } catch (err) {
    setError((err as Error).message);
  } finally {
    setIsSubmitting(false);
  }
};


  return {
    nombre,
    setNombre,
    apellido,
    setApellido,
    telefono,
    setTelefono,
    error,
    isSuccess,
    isSubmitting,
    handleSubmit,
  };
}
