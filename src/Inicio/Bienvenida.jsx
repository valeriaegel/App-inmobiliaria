import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaHome, FaKey, FaMapMarkerAlt } from 'react-icons/fa';
import imagenInicio from '../assets/Inicio.jpg';
import { PropertyContext } from '../context/PropertyContext';

const normalizar = (texto = '') =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

// Búsquedas rápidas: se resuelven por nombre contra las opciones reales de la API.
const ATAJOS = [
  { nombre: 'Casa', etiqueta: 'Casas' },
  { nombre: 'Departamento', etiqueta: 'Departamentos' },
  { nombre: 'Terreno', etiqueta: 'Terrenos' },
  { nombre: 'Local', etiqueta: 'Locales' },
];

const Bienvenida = () => {
  const navigate = useNavigate();
  const { opcionesTipos = [], opcionesCiudades = [] } = useContext(PropertyContext);

  const [operacion, setOperacion] = useState('Venta');
  const [tipo, setTipo] = useState('');
  const [ciudad, setCiudad] = useState('');

  const buscar = (tipoSeleccionado = tipo) => {
    const params = new URLSearchParams();
    if (tipoSeleccionado) params.set('tipo', tipoSeleccionado);
    if (ciudad) params.set('ciudad', ciudad);

    const query = params.toString();
    navigate(`/propiedades/${operacion}${query ? `?${query}` : ''}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    buscar();
  };

  const atajosDisponibles = ATAJOS.map((atajo) => {
    const opcion = opcionesTipos.find(
      (op) => normalizar(op.nombre) === normalizar(atajo.nombre)
    );
    return opcion ? { ...atajo, id: opcion.id } : null;
  }).filter(Boolean);

  return (
    <section
      className="relative flex min-h-[86vh] items-center overflow-hidden bg-cover bg-center px-4 py-16 text-white sm:px-6 lg:px-8"
      style={{ backgroundImage: `url('${imagenInicio}')` }}
    >
      {/* Degradado oscuro de izquierda a derecha para asegurar contraste */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/85 to-[#0F172A]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
            Inmobiliaria Cristina Eckerdt
          </p>

          <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Encontrá tu próxima propiedad en Concepción del Uruguay
          </h1>

          <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-slate-200 sm:text-lg">
            Casas, departamentos, terrenos y locales en venta y alquiler. Asesoramiento
            personalizado en cada paso.
          </p>

          {/* Formulario principal de búsqueda */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 w-full rounded-3xl border border-white/50 bg-white p-5 text-[#1E293B] shadow-2xl sm:p-6"
            aria-label="Buscar propiedades"
          >
            <div
              className="grid grid-cols-2 gap-1.5 rounded-2xl bg-slate-100 p-1.5"
              role="group"
              aria-label="Tipo de operación"
            >
              <button
                type="button"
                onClick={() => setOperacion('Venta')}
                aria-pressed={operacion === 'Venta'}
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition-colors btn-press cursor-pointer ${
                  operacion === 'Venta'
                    ? 'bg-[#1E293B] text-white shadow-sm'
                    : 'text-[#475569] hover:text-[#1E293B]'
                }`}
              >
                <FaHome className="text-base" aria-hidden="true" />
                <span>Comprar</span>
              </button>

              <button
                type="button"
                onClick={() => setOperacion('Alquiler')}
                aria-pressed={operacion === 'Alquiler'}
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition-colors btn-press cursor-pointer ${
                  operacion === 'Alquiler'
                    ? 'bg-[#1E293B] text-white shadow-sm'
                    : 'text-[#475569] hover:text-[#1E293B]'
                }`}
              >
                <FaKey className="text-base" aria-hidden="true" />
                <span>Alquilar</span>
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="hero-tipo"
                  className="mb-1.5 block text-xs font-bold text-[#475569]"
                >
                  Tipo de propiedad
                </label>
                <select
                  id="hero-tipo"
                  value={tipo}
                  onChange={(event) => setTipo(event.target.value)}
                  className="min-h-11 w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium text-[#1E293B] outline-none transition-all focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/30"
                >
                  <option value="">Todos los tipos</option>
                  {opcionesTipos.map((opcion) => (
                    <option key={opcion.id} value={opcion.id}>
                      {opcion.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="hero-ciudad"
                  className="mb-1.5 block text-xs font-bold text-[#475569]"
                >
                  Ciudad
                </label>
                <select
                  id="hero-ciudad"
                  value={ciudad}
                  onChange={(event) => setCiudad(event.target.value)}
                  className="min-h-11 w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium text-[#1E293B] outline-none transition-all focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/30"
                >
                  <option value="">Todas las ciudades</option>
                  {opcionesCiudades.map((opcion) => (
                    <option key={opcion.id} value={opcion.id}>
                      {opcion.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0F766E] px-6 text-sm font-extrabold text-white shadow-lg shadow-teal-900/20 transition-colors hover:bg-[#0D9488] btn-press cursor-pointer"
            >
              <FaSearch className="text-sm" aria-hidden="true" />
              <span>Buscar propiedades</span>
            </button>

            {atajosDisponibles.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#475569]">
                  <FaMapMarkerAlt className="text-[#0F766E]" aria-hidden="true" />
                  Búsquedas frecuentes:
                </span>
                {atajosDisponibles.map((atajo) => (
                  <button
                    key={atajo.id}
                    type="button"
                    onClick={() => buscar(atajo.id)}
                    className="inline-flex min-h-11 items-center rounded-full border border-slate-200 bg-slate-50 px-3.5 text-xs font-bold text-[#1E293B] transition-colors hover:border-[#0F766E] hover:bg-[#0F766E]/5 hover:text-[#0F766E] btn-press cursor-pointer"
                  >
                    {atajo.etiqueta}
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Bienvenida;
