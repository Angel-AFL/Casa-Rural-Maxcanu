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

export function useRentaBiciLogic() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [folioGenerado, setFolioGenerado] = useState<string | null>(null);

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
    setFolioGenerado(null);

    if (!validarCampos()) return;

    setIsSubmitting(true);

    try {
      const renta = await insertarRentaBicicleta(
        nombre.trim(),
        apellido.trim(),
        telefono
      );

      if (!renta || !renta.folio_generado) {
        throw new Error('La respuesta del servidor fue inválida.');
      }

      await sendAdminEmailBici(renta);

      setIsSuccess(true);
      setFolioGenerado(renta.folio_generado);

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
    folioGenerado,
    handleSubmit,
  };
}
