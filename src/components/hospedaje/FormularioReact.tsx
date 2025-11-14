import type { CatCabanaHabitacion } from '../../types/global';
// 1. ¡Importamos nuestro nuevo Hook de lógica!
import { useFormularioLogica } from './FormularioLogica.tsx'; // Ajustado al nombre de tu archivo

interface Props {
  cabanas: CatCabanaHabitacion[];
}

// ¡Mira qué limpio queda el componente!
export default function FormularioReact({ cabanas }: Props) {
  
  // 2. ¡Toda la lógica ahora vive en UNA sola línea!
  const {
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
    handleSubmit
  } = useFormularioLogica(); // Ajustado al nombre de tu archivo

  // 3. El resto del archivo es SÓLO la vista (JSX)
  return (
    <section
      id="formulario"
      className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#7F2E2C' }}
    >
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-6xl overflow-hidden">
        
        {/* Columna izquierda */}
        <div className="md:w-1/3 bg-[#F9F9F9] flex flex-col justify-center items-center p-6 sm:p-8">
          <img
            src="/logo-casa-rural-icono-negativo.png"
            alt="Logo Casa Rural"
            className="h-20 w-20 mb-4 object-contain"
          />
          <h2 className="text-3xl font-bold text-gray-800 text-center">Registro</h2>
          <p className="text-gray-500 text-center mt-2 text-sm sm:text-base">
            Completa tu información para reservar tu estancia.
          </p>
        </div>

        {/* Columna derecha */}
        <div className="md:w-2/3 p-6 sm:p-8">
          
          {/* El 'form' usa el 'handleSubmit' del hook */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Los mensajes usan 'isSuccess' y 'error' del hook */}
            {isSuccess && (
              <div className="col-span-1 md:col-span-2 p-3 bg-green-100 text-green-800 rounded-md text-center">
                ¡Registro exitoso!
              </div>
            )}
            {error && (
              <div className="col-span-1 md:col-span-2 p-3 bg-red-100 text-red-800 rounded-md text-center">
                Error: {error}
              </div>
            )}

            {/* Los inputs usan los 'value' y 'onChange' del hook */}
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
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
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

            <select
              value={habitacion}
              onChange={(e) => setHabitacion(e.target.value)}
              required
              className="col-span-1 md:col-span-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1AE10]"
            >
              <option value="" disabled>Selecciona Habitación/Cabaña</option>
              {cabanas.map(c => (
                <option key={c.nombre} value={c.nombre}>{c.nombre}</option>
              ))}
            </select>

            <div className="flex flex-col">
              <label htmlFor="fecha-entrada" className="mb-1 font-semibold text-gray-700">Fecha de entrada</label>
              <input
                id="fecha-entrada"
                type="datetime-local"
                value={fechaEntrada}
                onChange={(e) => setFechaEntrada(e.target.value)}
                required
                min={minDate}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1AE10]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="fecha-salida" className="mb-1 font-semibold text-gray-700">Fecha de salida</label>
              <input
                id="fecha-salida"
                type="datetime-local"
                value={fechaSalida}
                onChange={(e) => setFechaSalida(e.target.value)}
                required
                min={minDate}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1AE10]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting} // Usa 'isSubmitting' del hook
              className="col-span-1 md:col-span-2 mt-4 bg-[#C1AE10] hover:bg-[#a38613] text-black font-semibold py-3 rounded-md transition-colors w-full disabled:opacity-50"
            >
              {isSubmitting ? 'Registrando...' : 'Registrar'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}