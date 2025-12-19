import { useState } from 'react';
import { insertHospedaje } from '../../pages/api/sp_insertar_hospedaje';
import type { HospedajeResponse } from '../../types/global';

async function sendAdminEmail(reserva: HospedajeResponse) {
  const res = await fetch('/api/send-email-admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reserva),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    console.error('Error al enviar correo Admin:', errorBody.error);
    throw new Error(`Error al notificar al administrador: ${errorBody.error}`);
  }
}

async function descargarPDF(reserva: HospedajeResponse) {
  const res = await fetch('/api/generate-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reserva),
  });

  if (!res.ok) {
    throw new Error('No se pudo generar el PDF');
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `Hospedaje_${reserva.folio}.pdf`;
  a.click();

  window.URL.revokeObjectURL(url);
}

function getLocalDatetimeString() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

export function useFormularioLogica() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [habitacion, setHabitacion] = useState('');
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [minDate] = useState(getLocalDatetimeString());

  const validarCampos = (): boolean => {
    if (nombre.trim().length < 3) {
      setError('El nombre debe tener al menos 3 letras.');
      return false;
    }

    if (apellido.trim().length < 2) {
      setError('El apellido debe tener al menos 2 letras.');
      return false;
    }

    if (!correo.includes('@') || !correo.includes('.com')) {
      setError('El correo debe ser válido (ej: usuario@gmail.com).');
      return false;
    }

    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(telefono)) {
      setError('El teléfono debe tener exactamente 10 números.');
      return false;
    }

    if (fechaEntrada && fechaSalida && fechaEntrada >= fechaSalida) {
      setError('La fecha de salida debe ser posterior a la fecha de entrada.');
      return false;
    }

    if (!habitacion) {
      setError('Debes seleccionar una habitación o cabaña.');
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
      const reserva = await insertHospedaje(
        nombre,
        apellido,
        correo,
        telefono,
        habitacion,
        fechaEntrada,
        fechaSalida
      );

      if (!reserva) {
        throw new Error(
          'La respuesta del servidor fue nula después de la inserción.'
        );
      }

      await sendAdminEmail(reserva);

      await descargarPDF(reserva);

      setIsSuccess(true);

      setNombre('');
      setApellido('');
      setCorreo('');
      setTelefono('');
      setHabitacion('');
      setFechaEntrada('');
      setFechaSalida('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    nombre, setNombre,
    apellido, setApellido,
    correo, setCorreo,
    telefono, setTelefono,
    habitacion, setHabitacion,
    fechaEntrada, setFechaEntrada,
    fechaSalida, setFechaSalida,
    minDate,
    error,
    isSuccess,
    isSubmitting,
    handleSubmit,
  };
}
