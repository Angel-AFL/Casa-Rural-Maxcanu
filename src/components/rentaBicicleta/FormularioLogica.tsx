// 🟡 Archivo: src/components/rentaBicicleta/FormularioLogica.tsx

import { useState } from 'react';
// Importamos el servicio que ya creamos
import { insertarRentaBicicleta } from '../../pages/api/sp_insertar_renta_bicicleta';
// Importamos el tipo de respuesta
import type { RentaBiciResponse } from '../../types/global';

/**
 * Este es el "Custom Hook" que contiene TODA la lógica
 * para el formulario de rentar bicicletas.
 */
export function useRentaBiciLogic() {
  
  // 1. Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');

  // 2. Estados para manejar la UI (mensajes, carga, etc.)
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [folioGenerado, setFolioGenerado] = useState<string | null>(null);

  // 3. Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que la página se recargue
    
    // Limpia estados anteriores
    setError(null);
    setIsSuccess(false);
    setFolioGenerado(null);
    setIsSubmitting(true); // Bloquea el botón

    try {
      // 4. Llama a la función de servicio con los datos del state
      const reserva = await insertarRentaBicicleta(
        nombre,
        apellido,
        telefono
      );

      if (!reserva || !reserva.folio_generado) {
        throw new Error('La respuesta del servidor fue nula o no incluyó un folio.');
      }

      // 5. ¡Éxito!
      setIsSuccess(true);
      setFolioGenerado(reserva.folio_generado); // Guarda el folio para mostrarlo

      // Limpia los campos del formulario
      setNombre('');
      setApellido('');
      setTelefono('');

    } catch (err) {
      // 6. Manejo de errores
      setError((err as Error).message);
    } finally {
      // 7. Vuelve a activar el botón
      setIsSubmitting(false);
    }
  };

  // 8. Devuelve todo lo que la VISTA necesita
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