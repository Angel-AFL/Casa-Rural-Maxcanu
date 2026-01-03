import React from 'react';
import { useRentaBiciLogic } from './FormularioLogica';
import FormularioDevolucion from './FormularioDevolucion';

export default function FormularioBici() {
  const {
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
  } = useRentaBiciLogic();

  return (
    <section
      id="formulario-bici"
      className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#F8F4ED' }}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-800 flex flex-col md:flex-row w-full max-w-6xl overflow-hidden">

        <div className="md:w-1/3 bg-[#A38613] flex flex-col justify-center items-center p-6 sm:p-8 text-white">
          <img
            src="/logo-casa-rural-icono-negativo.png"
            alt="Logo Casa Rural"
            className="h-20 w-20 mb-4 object-contain filter brightness-0 invert"
          />
          <h2 className="text-3xl font-bold text-center">
            Renta de Bicicletas
          </h2>
          <p className="text-center mt-2 text-sm sm:text-base text-gray-100">
            Registra tu renta o devuelve tu bicicleta fácilmente.
          </p>
        </div>
        <div className="md:w-2/3 p-6 sm:p-8 space-y-10">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <h3 className="text-2xl font-bold text-gray-800 text-center">
              Rentar Bicicleta
            </h3>

            {isSuccess && (
              <div className="p-3 bg-green-100 text-green-800 rounded-md text-center border border-green-200">
                ¡Renta exitosa!
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-100 text-red-800 rounded-md text-center border border-red-200">
                Error: {error}
              </div>
            )}

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
             inputMode="numeric"
             pattern="[0-9]*"
             maxLength={10}
             placeholder="Teléfono"
             value={telefono}
             onChange={(e) =>
             setTelefono(e.target.value.replace(/\D/g, ''))
           }
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1AE10]"
           />


            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 bg-[#A38613] text-white font-semibold py-3 rounded-md w-full disabled:opacity-50"
            >
              {isSubmitting ? 'Registrando...' : 'Rentar Bicicleta'}
            </button>
          </form>
          <hr className="border-gray-200" />
          <div>
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Devolver Bicicleta
            </h3>
            <FormularioDevolucion />
          </div>

        </div>
      </div>
    </section>
  );
}
