import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaHome, FaKey } from 'react-icons/fa';
import imagenInicio from '../assets/Inicio.jpg';
import { PropertyContext } from '../context/PropertyContext';

const normalizar = (texto = '') =>
  texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

// Búsquedas rápidas: se resuelven por nombre contra las opciones reales de la API.
const ATAJOS = [
  { nombre: 'Casa', etiqueta: 'Casas' },
  { nombre: 'Departamento', etiqueta: 'Departamentos' },
  { nombre: 'Terreno', etiqueta: 'Terrenos' },
  { nombre: 'Local', etiqueta: 'Locales' },
];

const claseSelect =
  'min-h-11 w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 px-3.5 text-sm font-medium text-[#1E293B] outline-none transition-all focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/30 lg:min-h-[52px] lg:rounded-xl';

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

  const botonOperacion = (valor, etiqueta, icono) => (
    <button
      type="button"
      onClick={() => setOperacion(valor)}
      aria-pressed={operacion === valor}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition-colors btn-press cursor-pointer lg:h-12 lg:rounded-lg lg:px-5 ${
        operacion === valor
          ? 'bg-[#1E293B] text-white shadow-sm'
          : 'text-[#475569] hover:text-[#1E293B]'
      }`}
    >
      <span className="inline-flex text-base lg:hidden" aria-hidden="true">{icono}</span>
      <span>{etiqueta}</span>
    </button>
  );

  return (
    <>
      <section
        className="relative overflow-hidden bg-cover bg-center px-4 pt-7 pb-6 text-white sm:px-6 md:pt-14 md:pb-12 lg:px-8 lg:pt-[88px] lg:pb-[72px]"
        style={{ backgroundImage: `url('${imagenInicio}')` }}
      >
        {/* Degradado oscuro de izquierda a derecha para asegurar contraste */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/85 to-[#0F172A]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent" />

        <div className="relative z-10 container mx-auto max-w-7xl">
          <div className="max-w-[800px]">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
              Inmobiliaria Cristina Eckerdt
            </p>

            <h1 className="hero-titulo mt-3">
              Encontrá tu próxima propiedad en Concepción del Uruguay
            </h1>

            <p className="mt-3.5 max-w-xl text-[15px] font-light leading-relaxed text-[#E2E8F0] lg:text-[19px]">
              Casas, departamentos, terrenos y locales en venta y alquiler. Asesoramiento
              personalizado en cada paso.
            </p>
          </div>

          {/* Formulario principal de búsqueda: apilado en mobile, una sola fila en escritorio */}
          <form
            onSubmit={handleSubmit}
            className="mt-7 w-full max-w-2xl rounded-3xl border border-white/50 bg-white p-5 text-[#1E293B] shadow-2xl sm:p-6 lg:flex lg:max-w-[980px] lg:flex-wrap lg:items-end lg:gap-3 lg:rounded-[20px] lg:p-3"
            aria-label="Buscar propiedades"
          >
            <div
              className="grid grid-cols-2 gap-1.5 rounded-2xl bg-slate-100 p-1.5 lg:flex lg:gap-1 lg:rounded-xl lg:bg-[#F0F2ED] lg:p-1"
              role="group"
              aria-label="Tipo de operación"
            >
              {botonOperacion('Venta', 'Comprar', <FaHome />)}
              {botonOperacion('Alquiler', 'Alquilar', <FaKey />)}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:contents">
              <div className="lg:flex-[1_1_180px]">
                <label
                  htmlFor="hero-tipo"
                  className="mb-1.5 block text-xs font-bold text-[#475569]"
                >
                  Tipo de inmueble
                </label>
                <select
                  id="hero-tipo"
                  value={tipo}
                  onChange={(event) => setTipo(event.target.value)}
                  className={claseSelect}
                >
                  <option value="">Todos los tipos</option>
                  {opcionesTipos.map((opcion) => (
                    <option key={opcion.id} value={opcion.id}>
                      {opcion.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:flex-[1_1_200px]">
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
                  className={claseSelect}
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
              className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#0F766E] px-6 text-sm font-extrabold text-white shadow-lg shadow-teal-900/20 transition-colors hover:bg-[#0D9488] btn-press cursor-pointer lg:mt-0 lg:h-[52px] lg:w-auto lg:rounded-xl lg:px-[26px]"
            >
              <FaSearch className="text-sm" aria-hidden="true" />
              <span className="lg:hidden">
                {operacion === 'Venta' ? 'Ver propiedades en venta' : 'Ver propiedades en alquiler'}
              </span>
              <span className="hidden lg:inline">Buscar</span>
            </button>
          </form>

          {/* Búsquedas rápidas sobre la foto (tablet y escritorio) */}
          {atajosDisponibles.length > 0 && (
            <div className="mt-5 hidden flex-wrap items-center gap-2 md:flex">
              <span className="text-sm text-[#E2E8F0]">Búsquedas rápidas:</span>
              {atajosDisponibles.map((atajo) => (
                <button
                  key={atajo.id}
                  type="button"
                  onClick={() => buscar(atajo.id)}
                  className="inline-flex h-10 items-center rounded-full border border-white/35 bg-white/[0.14] px-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/25 btn-press cursor-pointer"
                >
                  {atajo.etiqueta}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Búsquedas rápidas en celular: una fila con scroll horizontal debajo del hero */}
      {atajosDisponibles.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto px-4 py-4 md:hidden">
          <span className="shrink-0 text-sm text-[#475569]">Búsquedas rápidas:</span>
          {atajosDisponibles.map((atajo) => (
            <button
              key={atajo.id}
              type="button"
              onClick={() => buscar(atajo.id)}
              className="inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-full border border-[#E2E8F0] bg-white px-3.5 text-sm font-semibold text-[#1E293B] transition-colors hover:border-[#0F766E] hover:text-[#0F766E] btn-press cursor-pointer"
            >
              {atajo.etiqueta}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Bienvenida;
