// 🟡 Archivo: src/components/rentaBicicleta/FormularioDevolucion.tsx

import React from 'react';
// 1. Importamos la LÓGICA desde el hook
import { useDevolucionBiciLogic } from './FormularioDevolucionLogica';

/**
 * Este componente es la VISTA "tonta" para la devolución.
 */
export default function FormularioDevolucion() {
  
  // 2. Llamamos al Hook para obtener la lógica y el estado
  const {
    folio,
    setFolio,
    error,
    isSuccess,
    isSubmitting,
    devolucion, // Obtenemos los datos de la devolución
    handleSubmit,
  } = useDevolucionBiciLogic();

  // 3. Esta es la VISTA (JSX)
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            
      {/* Mensajes de Éxito o Error */}
      {isSuccess && devolucion && (
        <div className="col-span-1 p-3 bg-green-100 text-green-800 rounded-md text-center">
          ¡Devolución exitosa! Gracias por tu regreso, <strong>{devolucion.nombre_cliente}</strong>.
        </div>
      )}
      {error && (
        <div className="col-span-1 p-3 bg-red-100 text-red-800 rounded-md text-center">
          Error: {error}
        </div>
      )}

      {/* 4. El único input para el folio */}
      <input
        type="text"
        placeholder="Ingresa tu folio (ej: BICI001)"
        value={folio}
        onChange={(e) => setFolio(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1AE10]"
      />

      {/* ============================================= */}
      {/* ===== ✅ BOTÓN CON ESTILO ACTUALIZADO ✅ ====== */}
      {/* ============================================= */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="col-span-1 mt-4 bg-[#C1AE10] hover:bg-[#a38613] text-black font-semibold py-3 rounded-md transition-colors w-full disabled:opacity-50"
      >
        {isSubmitting ? 'Procesando...' : 'Devolver Bicicleta'}
      </button>
    </form>
  );
}