import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaHome, FaArrowRight, FaSearchLocation, FaRedo } from 'react-icons/fa';
import { formatearPrecio } from '../utils/formatearPrecio';

function PropiedadesSkeleton() {
    return (
        <div className="container mx-auto px-4 md:px-8 py-8 animate-pulse">
            <div className="h-8 bg-slate-200 rounded-xl w-64 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md h-[420px] flex flex-col justify-between p-4">
                        <div className="h-52 bg-slate-200 rounded-2xl mb-4 w-full"></div>
                        <div className="h-5 bg-slate-200 rounded-lg w-3/4 mb-3"></div>
                        <div className="h-4 bg-slate-100 rounded-lg w-full mb-2"></div>
                        <div className="h-4 bg-slate-100 rounded-lg w-2/3 mb-4"></div>
                        <div className="h-10 bg-slate-200 rounded-2xl w-full mt-auto"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Propiedades({ inmuebles, cargando, error, tipoOperacion }) {
    if (cargando) {
        return <PropiedadesSkeleton />;
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="bg-rose-50 border border-rose-200 text-rose-600 p-8 rounded-3xl max-w-md mx-auto font-bold space-y-4 shadow-sm">
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center gap-2 bg-rose-600 text-white px-5 py-2.5 rounded-2xl text-xs font-bold hover:bg-rose-700 transition-colors shadow-md"
                    >
                        <FaRedo /> Reintentar conexión
                    </button>
                </div>
            </div>
        );
    }

    const titulo = tipoOperacion 
        ? `Propiedades en ${tipoOperacion}` 
        : 'Catálogo Completo de Propiedades';

    return (
        <div className="container mx-auto px-4 md:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 border-b border-slate-200 pb-4">
                <h2 className="text-3xl font-extrabold text-[#1E293B] tracking-tight">
                    {titulo} 
                </h2>
                <span className="text-xs font-bold px-4 py-1.5 rounded-full bg-[#0F766E]/10 text-[#0F766E]">
                    {inmuebles.length} {inmuebles.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
                </span>
            </div>

            {inmuebles.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 text-center max-w-lg mx-auto my-8">
                    <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                        <FaSearchLocation />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Sin resultados disponibles</h3>
                    <p className="text-slate-500 text-sm">
                        No se encontraron inmuebles que coincidan con los filtros seleccionados. Prueba modificar la búsqueda.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {inmuebles.map(inmueble => {
                        const atributos = inmueble;
                        const imagenURL = atributos.Imagenes?.[0]?.url;
                        const moneda = atributos.Moneda === 'Peso' ? '$' : 'U$S';
                        const Disponible = inmueble.Disponible;
                        const documentId = inmueble.documentId;
                        const isVenta = atributos.TipoOperacion?.toLowerCase() === 'venta';

                        return (
                            <div 
                                key={inmueble.id} 
                                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group transform hover:-translate-y-1.5"
                            >
                                {/* Imagen con badges superpuestos */}
                                <div className="relative overflow-hidden h-60 bg-slate-100">
                                    {imagenURL ? (
                                        <img 
                                            src={imagenURL} 
                                            alt={atributos.Titulo || 'Propiedad'} 
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                            <FaHome className="text-5xl opacity-30" />
                                        </div>
                                    )}

                                    {/* Badges Flotantes */}
                                    <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                                        <span className={`px-3 py-1 text-xs font-extrabold rounded-full shadow-md text-white ${
                                            Disponible ? 'bg-emerald-600' : 'bg-slate-500'
                                        }`}>
                                            {Disponible ? 'Disponible' : 'Reservado'}
                                        </span>
                                        {atributos.TipoOperacion && (
                                            <span className={`px-3 py-1 text-xs font-extrabold rounded-full shadow-md text-white ${
                                                isVenta ? 'bg-[#1E293B]' : 'bg-[#0F766E]'
                                            }`}>
                                                {atributos.TipoOperacion}
                                            </span>
                                        )}
                                    </div>

                                    {/* Precio Flotante */}
                                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-xl border border-white/60 text-[#1E293B] font-extrabold text-xs sm:text-sm">
                                        {formatearPrecio(atributos.Valor, atributos.Moneda)}
                                    </div>
                                </div>

                                {/* Cuerpo de la Tarjeta */}
                                <div className="p-6 flex flex-col flex-grow justify-between">
                                    <div>
                                        <h3 
                                            className="text-lg font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-[#0F766E] transition-colors" 
                                            title={atributos.Titulo || atributos.Descripcion}
                                        >
                                            {atributos.Titulo || atributos.Descripcion || 'Propiedad Inmobiliaria'}
                                        </h3>

                                        {atributos.Descripcion && (
                                            <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">
                                                {atributos.Descripcion}
                                            </p>
                                        )}
                                    </div>
                                    
                                    <div>
                                        {/* Ficha de amenities */}
                                        <div className="flex justify-around items-center text-slate-500 text-xs border-t border-slate-100 pt-4 mb-5">
                                            {atributos.Ambientes != null && (
                                                <div className="flex flex-col items-center gap-1" title="Ambientes">
                                                    <FaHome className="text-[#0F766E] text-base" />
                                                    <span className="font-semibold text-slate-700">{atributos.Ambientes} Amb.</span>
                                                </div>
                                            )}
                                            {atributos.Dormitorios != null && (
                                                <div className="flex flex-col items-center gap-1" title="Dormitorios">
                                                    <FaBed className="text-[#0F766E] text-base" />
                                                    <span className="font-semibold text-slate-700">{atributos.Dormitorios} Dor.</span>
                                                </div>
                                            )}
                                            {atributos.Banos != null && (
                                                <div className="flex flex-col items-center gap-1" title="Baños">
                                                    <FaBath className="text-[#0F766E] text-base" />
                                                    <span className="font-semibold text-slate-700">{atributos.Banos} Baños</span>
                                                </div>
                                            )}
                                        </div>

                                        <Link 
                                            to={`/propiedades/detalle/${documentId}`} 
                                            className="w-full bg-[#1E293B] hover:bg-[#0F766E] text-white font-bold py-3 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 text-xs shadow-md group-hover:shadow-lg"
                                        >
                                            <span>Ver más detalles</span>
                                            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Propiedades;
