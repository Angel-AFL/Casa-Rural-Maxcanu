// 🟡 Archivo: src/components/rentaBicicleta/FormularioBici.tsx
//    (Vista actualizada para COMPONER ambos formularios)

import React from 'react';
// 1. Importamos la LÓGICA de RENTA
import { useRentaBiciLogic } from './FormularioLogica.tsx';

// 2. ¡NUEVO! Importamos el componente de DEVOLUCIÓN (que crearemos después)
import FormularioDevolucion from './FormularioDevolucion.tsx';

/**
 * Este componente ahora actúa como el CONTENEDOR principal
 * para los formularios de Renta y Devolución.
 */
export default function FormularioBici() {
  
  // 3. Obtenemos la lógica para el formulario de RENTA
  const {
    nombre,
    setNombre,
    apellido,
    setApellido,
    telefono,
    setTelefono,
    error: errorRenta, // Renombramos para evitar conflictos
    isSuccess: isSuccessRenta, // Renombramos
    isSubmitting: isSubmittingRenta, // Renombramos
    folioGenerado,
    handleSubmit: handleSubmitRenta, // Renombramos
  } = useRentaBiciLogic();

  // 4. Esta es la VISTA (JSX)
  return (
    <section
      id="formulario-bici"
      className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#7F2E2C' }}
    >
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-6xl overflow-hidden">
        
        {/* Columna izquierda (No cambia) */}
        <div className="md:w-1/3 bg-[#F9F9F9] flex flex-col justify-center items-center p-6 sm:p-8">
          <img
            src="/logo-casa-rural-icono-negativo.png"
            alt="Logo Casa Rural"
            className="h-20 w-20 mb-4 object-contain"
          />
          <h2 className="text-3xl font-bold text-gray-800 text-center">Renta de Bicicletas</h2>
          <p className="text-gray-500 text-center mt-2 text-sm sm:text-base">
            Registra tus datos o reporta una devolución.
          </p>
        </div>

        {/* Columna derecha (Contiene AMBOS formularios) */}
        <div className="md:w-2/3 p-6 sm:p-8 divide-y divide-gray-200"> {/* Usamos 'divide-y' para la línea */}
          
          {/* === SECCIÓN 1: FORMULARIO DE RENTA === */}
          <form onSubmit={handleSubmitRenta} className="grid grid-cols-1 gap-4 pb-6"> {/* Añadido pb-6 */}
            
            <h3 className="text-2xl font-bold text-gray-800 text-center">Rentar Bicicleta</h3>

            {/* Mensajes de Éxito o Error (de RENTA) */}
            {isSuccessRenta && (
              <div className="col-span-1 p-3 bg-green-100 text-green-800 rounded-md text-center">
                ¡Renta exitosa! Tu folio es: <strong>{folioGenerado}</strong>
              </div>
            )}
            {errorRenta && (
              <div className="col-span-1 p-3 bg-red-100 text-red-800 rounded-md text-center">
                Error: {errorRenta}
              </div>
            )}

            {/* Inputs de RENTA */}
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1AE10]"
            />
            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1AE10]"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1AE10]"
            />

            <button
              type="submit"
              disabled={isSubmittingRenta}
              className="col-span-1 mt-4 bg-[#C1AE10] hover:bg-[#a38613] text-black font-semibold py-3 rounded-md transition-colors w-full disabled:opacity-50"
            >
              {isSubmittingRenta ? 'Registrando...' : 'Rentar Bicicleta'}
            </button>
          </form>

          {/* === SECCIÓN 2: FORMULARIO DE DEVOLUCIÓN === */}
          {/* Aquí es donde "componemos" el otro componente */}
          <div className="pt-6"> {/* Añadido pt-6 */}
            
            <h3 className="text-2xl font-bold text-gray-800 text-center">Devolver Bicicleta</h3>
            
            {/* Este componente (que aún no existe) tendrá su
              propia lógica y su propia vista (el input de folio y el botón).
            */}
            <FormularioDevolucion />
          </div>

        </div>
      </div>
    </section>
  );
}