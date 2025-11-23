import type { CatCabanaHabitacion } from '../../types/global';
import { useFormularioLogica } from './FormularioLogica';

interface Props {
  cabanas: CatCabanaHabitacion[];
}

export default function FormularioReact({ cabanas }: Props) {
  
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
  } = useFormularioLogica();

  return (
    <section
      id="formulario"
      className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#F8F4ED' }} 
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-800 flex flex-col md:flex-row w-full max-w-6xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
        
        <div className="md:w-1/3 bg-[#7F2E2C] flex flex-col justify-center items-center p-6 sm:p-8 text-white">
          <img
            src="/logo-casa-rural-icono-negativo.png"
            alt="Logo Casa Rural"
            className="h-20 w-20 mb-4 object-contain filter brightness-0 invert" 
          />
          <h2 className="text-3xl font-bold text-center">Solicitud</h2>
          <p className="text-center mt-2 text-sm sm:text-base text-gray-100">
            Completa tu información para solicitar y reservar tu estancia.
          </p>
        </div>

        <div className="md:w-2/3 p-6 sm:p-8">
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {isSuccess && (
              <div className="col-span-1 md:col-span-2 p-3 bg-green-100 text-green-800 rounded-md text-center border border-green-200">
                ¡Registro exitoso!
              </div>
            )}
            {error && (
              <div className="col-span-1 md:col-span-2 p-3 bg-red-100 text-red-800 rounded-md text-center border border-red-200">
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
              type="email"
              placeholder="Correo (ej: usuario@gmail.com)"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1AE10]"
            />
            <input
              type="tel"
              placeholder="Teléfono (10 dígitos)"
              value={telefono}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                setTelefono(val);
              }}
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
              disabled={isSubmitting}
              className="col-span-1 md:col-span-2 mt-4 bg-[#7F2E2C] text-white font-semibold py-3 rounded-md w-full disabled:opacity-50"
            >
              {isSubmitting ? 'Registrando...' : 'Registrar'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}