import { Link } from 'react-router-dom';
import { FaHome, FaArrowRight, FaMapMarkerAlt, FaBed, FaRulerCombined, FaTimesCircle } from 'react-icons/fa';
import { formatearPrecio } from '../utils/formatearPrecio';
import { capitalizarTitulo } from '../utils/formatearTexto';

function PropiedadesSimilares({ propiedadActual, todasLasPropiedades = [] }) {
    if (!propiedadActual || !todasLasPropiedades.length) return null;

    const idActual = propiedadActual.documentId || propiedadActual.id;
    const operacionActual = propiedadActual.TipoOperacion;
    const tipoActual = propiedadActual.tipo_inmueble?.Tipo;

    // Filtrar excluyendo la actual
    const candidatas = todasLasPropiedades.filter(p => (p.documentId || p.id) !== idActual);

    // Priorizar misma operación y mismo tipo
    const prioritarias = candidatas.filter(p =>
        p.TipoOperacion === operacionActual && p.tipo_inmueble?.Tipo === tipoActual
    );

    // Secundarias: misma operación aunque distinto tipo
    const secundarias = candidatas.filter(p =>
        p.TipoOperacion === operacionActual && p.tipo_inmueble?.Tipo !== tipoActual
    );

    // Combinar sin duplicados
    const seleccionadas = [...prioritarias, ...secundarias].slice(0, 3);

    if (seleccionadas.length === 0) return null;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="space-y-5 border-t border-slate-200/80 pt-8">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <h3 className="text-2xl font-bold tracking-tight text-[#1E293B] sm:text-3xl">
                    Propiedades similares
                </h3>

                <Link
                    to={operacionActual ? `/propiedades/${operacionActual}` : '/propiedades/Venta'}
                    onClick={scrollToTop}
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#0F766E] transition-colors hover:text-[#0D9488] group cursor-pointer"
                >
                    <span>Ver más en {operacionActual || 'el catálogo'}</span>
                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
            </div>

            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
                {seleccionadas.map((prop) => {
                    const imagenURL = prop.Imagenes?.[0]?.formats?.small?.url || prop.Imagenes?.[0]?.url;
                    const isVenta = prop.TipoOperacion?.toLowerCase() === 'venta';
                    const monedaSimbolo = prop.Moneda === 'Peso' ? '$' : 'U$S';
                    const precio = formatearPrecio(prop.Valor, monedaSimbolo);
                    const ciudad = prop.ciudad?.Ciudad || '';
                    const ubicacionStr = prop.Ubicacion ? `${prop.Ubicacion}${ciudad ? `, ${ciudad}` : ''}` : ciudad;
                    const titulo = capitalizarTitulo(prop.Titulo) || 'Inmueble disponible';

                    return (
                        <Link
                            key={prop.documentId || prop.id}
                            to={`/propiedades/detalle/${prop.documentId}`}
                            onClick={scrollToTop}
                            className="group flex min-w-[82%] snap-start flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl sm:min-w-[48%] lg:min-w-0"
                        >
                            {/* Imagen */}
                            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                                {imagenURL ? (
                                    <img
                                        src={imagenURL}
                                        alt={titulo}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-slate-300">
                                        <FaHome className="text-4xl" aria-hidden="true" />
                                    </div>
                                )}

                                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                                    <span className={`rounded-full px-2.5 py-1 text-xs font-extrabold uppercase text-white shadow-sm ${isVenta ? 'bg-[#1E293B]' : 'bg-[#0F766E]'}`}>
                                        En {prop.TipoOperacion}
                                    </span>
                                    {prop.Disponible === false && (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-600 px-2.5 py-1 text-xs font-extrabold uppercase text-white shadow-sm">
                                            <FaTimesCircle className="text-xs" aria-hidden="true" /> No disponible
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex flex-grow flex-col justify-between gap-3 p-5">
                                <div>
                                    <p className="text-xl font-extrabold tracking-tight text-[#1E293B]">
                                        {precio}
                                    </p>
                                    <h4 className="mt-1 line-clamp-1 text-sm font-bold text-[#1E293B]">
                                        {titulo}
                                    </h4>
                                    <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-[#475569]">
                                        <FaMapMarkerAlt className="shrink-0 text-xs text-[#0F766E]" aria-hidden="true" />
                                        <span>{ubicacionStr || 'Consultar ubicación'}</span>
                                    </p>
                                </div>

                                {/* Características rápidas */}
                                <div className="flex items-center gap-4 border-t border-slate-100 pt-3 text-xs font-semibold text-[#475569]">
                                    {prop.Dormitorios > 0 && (
                                        <div className="flex items-center gap-1.5">
                                            <FaBed className="text-[#0F766E]" aria-hidden="true" />
                                            <span>{prop.Dormitorios} dorm.</span>
                                        </div>
                                    )}
                                    {prop.SuperficieTotal > 0 && (
                                        <div className="flex items-center gap-1.5">
                                            <FaRulerCombined className="text-[#0F766E]" aria-hidden="true" />
                                            <span>{prop.SuperficieTotal} m²</span>
                                        </div>
                                    )}
                                </div>

                                <span className="mt-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 text-xs font-bold text-[#1E293B] transition-colors group-hover:bg-[#0F766E] group-hover:text-white">
                                    <span>Ver detalles</span>
                                    <FaArrowRight className="text-xs" aria-hidden="true" />
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

export default PropiedadesSimilares;
