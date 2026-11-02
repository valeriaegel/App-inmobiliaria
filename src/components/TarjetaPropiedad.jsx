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

/**
 * Tarjeta de propiedad unificada.
 *
 * @param {object} propiedad - Inmueble con sus relaciones (ciudad, tipo_inmueble, Imagenes).
 * @param {string} className - Clases extra para el contenedor (por ejemplo, anchos en carruseles).
 * @param {Function} onClick - Acción opcional al navegar (por ejemplo, volver al tope).
 */
function TarjetaPropiedad({ propiedad, className = '', onClick }) {
    if (!propiedad) return null;

    const atributos = propiedad;
    const imagenURL = atributos.Imagenes?.[0]?.formats?.small?.url || atributos.Imagenes?.[0]?.url;
    const esAlquiler = atributos.TipoOperacion?.toLowerCase().includes('alquiler');
    const noDisponible = atributos.Disponible === false;
    const tipoInmueble = atributos.tipo_inmueble?.Tipo || 'Inmueble';
    const ciudad = atributos.ciudad?.Ciudad || 'C. del Uruguay';
    const ubicacion = atributos.Ubicacion ? `${atributos.Ubicacion}, ${ciudad}` : ciudad;
    const tituloFormateado = capitalizarTitulo(atributos.Titulo) || 'Inmueble destacado';
    const precio = formatearPrecio(atributos.Valor, atributos.Moneda);

    return (
        <Link
            to={`/propiedades/detalle/${propiedad.documentId}`}
            onClick={onClick}
            aria-label={`Ver detalle de ${tituloFormateado}`}
            className={`group flex flex-col overflow-hidden rounded-3xl border bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                noDisponible
                    ? 'border-rose-200 opacity-75 hover:opacity-100'
                    : 'border-slate-100'
            } ${className}`}
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
                    {noDisponible && (
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
}

export default TarjetaPropiedad;
