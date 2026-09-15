import { Link } from 'react-router-dom';
import { FaHome, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import { formatearPrecio } from '../utils/formatearPrecio';
import { capitalizarTitulo } from '../utils/formatearTexto';

function PropRecientes({ propiedades, cargando, error }) {
    if (cargando) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md h-96 p-4 flex flex-col justify-between">
                        <div className="h-44 skeleton-shimmer rounded-2xl mb-4 w-full"></div>
                        <div className="h-4 skeleton-shimmer rounded-full w-1/3 mb-2"></div>
                        <div className="h-5 skeleton-shimmer rounded-lg w-3/4 mb-4"></div>
                        <div className="h-10 skeleton-shimmer rounded-xl w-full mb-4"></div>
                        <div className="h-10 skeleton-shimmer rounded-xl w-full"></div>
                    </div>
                ))}
            </div>
        );
    }
    if (error) {
        return <div className="text-center p-6 text-sm font-semibold text-rose-500">{error}</div>;
    }
    if (!propiedades || propiedades.length === 0) {
        return (
            <div className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 text-sm">
                No hay propiedades destacadas disponibles en este momento.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {propiedades.map(propiedad => {
                const atributos = propiedad;
                const imagenURL = atributos.Imagenes?.[0]?.formats?.small?.url || atributos.Imagenes?.[0]?.url;
                const isVenta = atributos.TipoOperacion?.toLowerCase() === 'venta';
                const tagText = isVenta ? 'EN VENTA' : 'EN ALQUILER';
                const tipoInmueble = atributos.tipo_inmueble?.Tipo || 'Inmueble';
                const ciudad = atributos.ciudad?.Ciudad || 'C. del Uruguay';
                const ubicacion = atributos.Ubicacion ? `${atributos.Ubicacion}, ${ciudad}` : ciudad;
                const tituloFormateado = capitalizarTitulo(atributos.Titulo) || 'Inmueble destacado';

                return (
                    <div
                        key={propiedad.id || propiedad.documentId}
                        className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between transform hover:-translate-y-1.5"
                    >
                        {/* Contenedor de Imagen */}
                        <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                            {imagenURL ? (
                                <img
                                    src={imagenURL}
                                    alt={tituloFormateado}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    <FaHome className="text-4xl opacity-30" />
                                </div>
                            )}

                            {/* Badges superpuestos */}
                            <div className="absolute top-3 left-3 flex gap-2 z-10">
                                <span className={`text-[10px] font-extrabold tracking-wider px-3 py-1 rounded-full shadow-md text-white uppercase ${isVenta ? 'bg-[#1E293B]' : 'bg-[#0F766E]'
                                    }`}>
                                    {tagText}
                                </span>
                            </div>

                            {/* Precio superpuesto */}
                            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl shadow-lg border border-white/60 text-[#1E293B] font-extrabold text-xs sm:text-sm">
                                {formatearPrecio(atributos.Valor, atributos.Moneda)}
                            </div>
                        </div>

                        {/* Detalle */}
                        <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                            <div>
                                {/* Subtítulo / Categoría */}
                                <p className="text-[12px] font-extrabold text-[#0F766E] uppercase tracking-wider mb-1">
                                    {tipoInmueble}
                                </p>

                                {/* Título en Playfair Display */}
                                <h3
                                    className="text-base font-extrabold text-[#1E293B] mb-1.5 line-clamp-1 group-hover:text-[#0F766E] transition-colors"
                                    title={tituloFormateado}
                                >
                                    {tituloFormateado}
                                </h3>

                                {/* Ubicación */}
                                <p className="text-xs text-slate-400 flex items-center gap-1 line-clamp-1">
                                    <FaMapMarkerAlt className="text-slate-400 shrink-0 text-[10px]" />
                                    <span>{ubicacion}</span>
                                </p>
                            </div>

                            <Link
                                to={`/propiedades/detalle/${propiedad.documentId}`}
                                className="inline-flex items-center justify-center gap-2 w-full bg-slate-100 hover:bg-[#1E293B] text-slate-700 hover:text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-300 text-xs shadow-sm group-hover:shadow-md btn-press cursor-pointer"
                            >
                                <span>Ver Detalle Completo</span>
                                <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default PropRecientes;
