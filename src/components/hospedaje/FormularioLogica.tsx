import { useState } from 'react';
// Importamos el servicio que llama a Supabase
import { insertHospedaje } from '../../pages/api/sp_insertar_hospedaje';

// Función para la fecha mínima
function getLocalDatetimeString() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

// Este es tu "Hook" personalizado. ¡Toda la lógica vive aquí!
export function useFormularioLogica() {
  // 1. Todos los 'useState' se mudan aquí
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

  // 2. El 'handleSubmit' también se muda aquí
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setError(null);
    setIsSuccess(false);
    setIsSubmitting(true);

    try {
      // 3. La llamada al servicio (con 7 argumentos)
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
        throw new Error('La respuesta del servidor fue nula.');
      }

      // ¡Éxito!
      setIsSuccess(true);
      // Limpiamos los campos
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

  // 4. El hook "devuelve" todo lo que la vista necesita
  return {
    // Estados
    nombre,
    apellido,
    correo,
    telefono,
    habitacion,
    fechaEntrada,
    fechaSalida,
    minDate,
    // Estado de la UI
    error,
    isSuccess,
    isSubmitting,
    // Setters (para los 'onChange')
    setNombre,
    setApellido,
    setCorreo,
    setTelefono,
    setHabitacion,
    setFechaEntrada,
    setFechaSalida,
    // Funciones
    handleSubmit,
  };
}