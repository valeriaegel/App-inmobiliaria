import { Link } from 'react-router-dom';
import {
    FaHome,
    FaArrowRight,
    FaMapMarkerAlt,
    FaBed,
    FaBath,
    FaRulerCombined,
    FaTimesCircle,
} from 'react-icons/fa';
import { formatearPrecio } from '../utils/formatearPrecio';
import { capitalizarTitulo } from '../utils/formatearTexto';

function PropRecientes({ propiedades, cargando, error, operacion = 'Todas' }) {
    if (cargando) {
        return (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex h-96 flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-md">
                        <div className="mb-4 h-44 w-full skeleton-shimmer rounded-2xl"></div>
                        <div className="mb-2 h-4 w-1/3 skeleton-shimmer rounded-full"></div>
                        <div className="mb-4 h-5 w-3/4 skeleton-shimmer rounded-lg"></div>
                        <div className="mb-4 h-10 w-full skeleton-shimmer rounded-xl"></div>
                        <div className="h-10 w-full skeleton-shimmer rounded-xl"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center text-sm font-semibold text-rose-600">
                {error}
            </div>
        );
    }

    if (!propiedades || propiedades.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center text-sm font-medium text-[#475569]">
                {operacion === 'Todas'
                    ? 'No hay propiedades disponibles en este momento.'
                    : `No hay propiedades en ${operacion.toLowerCase()} por el momento.`}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {propiedades.map(propiedad => {
                const atributos = propiedad;
                const imagenURL = atributos.Imagenes?.[0]?.formats?.small?.url || atributos.Imagenes?.[0]?.url;
                const esAlquiler = atributos.TipoOperacion?.toLowerCase().includes('alquiler');
                const tipoInmueble = atributos.tipo_inmueble?.Tipo || 'Inmueble';
                const ciudad = atributos.ciudad?.Ciudad || 'C. del Uruguay';
                const ubicacion = atributos.Ubicacion ? `${atributos.Ubicacion}, ${ciudad}` : ciudad;
                const tituloFormateado = capitalizarTitulo(atributos.Titulo) || 'Inmueble destacado';
                const precio = formatearPrecio(atributos.Valor, atributos.Moneda);

                return (
                    <Link
                        key={propiedad.id || propiedad.documentId}
                        to={`/propiedades/detalle/${propiedad.documentId}`}
                        aria-label={`Ver detalle de ${tituloFormateado}`}
                        className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                        {/* Imagen */}
                        <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                            {imagenURL ? (
                                <img
                                    src={imagenURL}
                                    alt={tituloFormateado}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-slate-300">
                                    <FaHome className="text-4xl" aria-hidden="true" />
                                </div>
                            )}

                            <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
                                <span className="rounded-full bg-[#1E293B] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white shadow-md">
                                    En {atributos.TipoOperacion || 'Venta'}
                                </span>
                                {atributos.Disponible === false && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-600 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white shadow-md">
                                        <FaTimesCircle className="text-xs" aria-hidden="true" /> No disponible
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Datos */}
                        <div className="flex flex-grow flex-col p-5">
                            <p className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                                {tipoInmueble}
                            </p>

                            <p className="mt-1 text-xl font-extrabold tracking-tight text-[#1E293B]">
                                {precio}
                                {esAlquiler && (
                                    <span className="ml-1 text-xs font-semibold text-[#475569]">/ mes</span>
                                )}
                            </p>

                            <h3
                                className="mt-1 line-clamp-1 text-sm font-bold text-[#1E293B] transition-colors group-hover:text-[#0F766E]"
                                title={tituloFormateado}
                            >
                                {tituloFormateado}
                            </h3>

                            <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-[#475569]">
                                <FaMapMarkerAlt className="shrink-0 text-[#0F766E]" aria-hidden="true" />
                                <span>{ubicacion}</span>
                            </p>

                            <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-slate-100 pt-3 text-xs font-semibold text-[#475569]">
                                {atributos.Dormitorios > 0 && (
                                    <span className="inline-flex items-center gap-1.5">
                                        <FaBed className="text-[#0F766E]" aria-hidden="true" />
                                        {atributos.Dormitorios} dorm.
                                    </span>
                                )}
                                {atributos.Banos > 0 && (
                                    <span className="inline-flex items-center gap-1.5">
                                        <FaBath className="text-[#0F766E]" aria-hidden="true" />
                                        {atributos.Banos} baños
                                    </span>
                                )}
                                {atributos.SuperficieTotal > 0 && (
                                    <span className="inline-flex items-center gap-1.5">
                                        <FaRulerCombined className="text-[#0F766E]" aria-hidden="true" />
                                        {atributos.SuperficieTotal} m²
                                    </span>
                                )}
                            </div>

                            <span className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 text-xs font-bold text-[#1E293B] transition-colors group-hover:bg-[#1E293B] group-hover:text-white">
                                <span>Ver detalle</span>
                                <FaArrowRight className="text-xs" aria-hidden="true" />
                            </span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default PropRecientes;
