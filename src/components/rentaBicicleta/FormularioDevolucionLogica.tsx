// 🟡 Archivo: src/components/rentaBicicleta/FormularioDevolucionLogica.tsx

import { useState } from 'react';
// Importamos el servicio de DEVOLUCIÓN
import { devolverBicicleta } from '../../pages/api/sp_devolucion_bicicleta';
// Importamos el tipo de respuesta
import type { DevolucionBiciResponse } from '../../types/global';

/**
 * Este es el "Custom Hook" que contiene TODA la lógica
 * para el formulario de DEVOLVER bicicletas.
 */
export function useDevolucionBiciLogic() {
  
  // 1. Estados para los campos del formulario (solo el folio)
  const [folio, setFolio] = useState('');

  // 2. Estados para manejar la UI (mensajes, carga, etc.)
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Guardamos la respuesta exitosa para mostrar el nombre
  const [devolucion, setDevolucion] = useState<DevolucionBiciResponse | null>(null);

  // 3. Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que la página se recargue
    
    // Limpia estados anteriores
    setError(null);
    setIsSuccess(false);
    setDevolucion(null);
    setIsSubmitting(true); // Bloquea el botón

    try {
      // 4. Llama a la función de servicio con el folio
      const resultado = await devolverBicicleta(folio);

      // 5. El SP devuelve 'null' si el folio no existe o ya fue devuelto
      if (!resultado) {
        throw new Error('Folio no encontrado, ya fue devuelto o no es válido.');
      }

      // 6. ¡Éxito!
      setIsSuccess(true);
      setDevolucion(resultado); // Guarda la respuesta para mostrarla

      // Limpia el campo del folio
      setFolio('');

    } catch (err) {
      // 7. Manejo de errores
      setError((err as Error).message);
    } finally {
      // 8. Vuelve a activar el botón
      setIsSubmitting(false);
    }
  };

  // 9. Devuelve todo lo que la VISTA necesita
  return {
    folio,
    setFolio,
    error,
    isSuccess,
    isSubmitting,
    devolucion, // Devolvemos los datos de la devolución exitosa
    handleSubmit,
  };
}