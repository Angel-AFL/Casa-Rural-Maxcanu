import React from 'react';
import { useDevolucionBiciLogic } from './FormularioDevolucionLogica';

export default function FormularioDevolucion() {
  
  const {
    folio,
    setFolio,
    error,
    isSuccess,
    isSubmitting,
    devolucion, 
    handleSubmit,
  } = useDevolucionBiciLogic();

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            
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

      <div>
        <label className="mb-1 font-semibold text-gray-700">
          Ingresa tu folio
        </label>
      <input
        type="text"
        placeholder="ejemplo: BICI0001"
        value={folio}
        onChange={(e) => setFolio(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1AE10]"
      /></div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="col-span-1 mt-4 bg-[#A38613] hover:bg-[#a38613] text-white font-semibold py-3 rounded-md transition-colors w-full disabled:opacity-50"
      >
        {isSubmitting ? 'Procesando...' : 'Devolver Bicicleta'}
      </button>
    </form>
  );
}