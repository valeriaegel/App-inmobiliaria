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
        <section className="pt-8 border-t border-slate-200/80 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                        Otras propiedades que te pueden interesar
                    </h3>
                </div>

                <Link
                    to={operacionActual ? `/propiedades/${operacionActual}` : '/propiedades/Venta'}
                    onClick={scrollToTop}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0F766E] hover:text-[#0D9488] transition-colors group cursor-pointer"
                >
                    <span>Ver más en {operacionActual || 'el catálogo'}</span>
                    <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {seleccionadas.map((prop) => {
                    const imagenURL = prop.Imagenes?.[0]?.formats?.small?.url || prop.Imagenes?.[0]?.url;
                    const isVenta = prop.TipoOperacion?.toLowerCase() === 'venta';
                    const monedaSimbolo = prop.Moneda === 'Peso' ? '$' : 'U$S';
                    const precio = formatearPrecio(prop.Valor, monedaSimbolo);
                    const ciudad = prop.ciudad?.Ciudad || '';
                    const ubicacionStr = prop.Ubicacion ? `${prop.Ubicacion}${ciudad ? `, ${ciudad}` : ''}` : ciudad;
                    const titulo = capitalizarTitulo(prop.Titulo) || 'Inmueble disponible';

                    return (
                        <div
                            key={prop.documentId || prop.id}
                            className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                        >
                            {/* Imagen */}
                            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                                {imagenURL ? (
                                    <img
                                        src={imagenURL}
                                        alt={titulo}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <FaHome className="text-4xl" />
                                    </div>
                                )}

                                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full text-white shadow-sm ${isVenta ? 'bg-slate-800' : 'bg-[#0F766E]'
                                        }`}>
                                        En {prop.TipoOperacion}
                                    </span>
                                    {prop.Disponible === false && (
                                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full text-white shadow-sm bg-rose-600 inline-flex items-center gap-1">
                                            <FaTimesCircle className="text-[10px]" /> No disponible
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                                <div>
                                    <p className="text-xl font-extrabold text-slate-800 tracking-tight">
                                        {precio}
                                    </p>
                                    <h4 className="font-bold text-slate-700 text-sm line-clamp-1 mt-1">
                                        {titulo}
                                    </h4>
                                    <p className="text-slate-400 text-xs flex items-center gap-1.5 mt-1 truncate">
                                        <FaMapMarkerAlt className="text-[#0F766E] shrink-0 text-[11px]" />
                                        <span>{ubicacionStr || 'Consultar ubicación'}</span>
                                    </p>
                                </div>

                                {/* Características rápidas */}
                                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-3 border-t border-slate-100">
                                    {prop.Dormitorios > 0 && (
                                        <div className="flex items-center gap-1.5">
                                            <FaBed className="text-[#0F766E]" />
                                            <span>{prop.Dormitorios} dorm.</span>
                                        </div>
                                    )}
                                    {prop.SuperficieTotal > 0 && (
                                        <div className="flex items-center gap-1.5">
                                            <FaRulerCombined className="text-[#0F766E]" />
                                            <span>{prop.SuperficieTotal} m²</span>
                                        </div>
                                    )}
                                </div>

                                <Link
                                    to={`/inmueble/${prop.documentId}`}
                                    onClick={scrollToTop}
                                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-[#0F766E] text-slate-700 hover:text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors btn-press mt-2 cursor-pointer border border-slate-100"
                                >
                                    <span>Ver detalles</span>
                                    <FaArrowRight className="text-[10px]" />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default PropiedadesSimilares;
