import { Link } from 'react-router-dom';
import { FaHome, FaArrowRight } from 'react-icons/fa';

function PropRecientes({ propiedades, cargando, error }) {  
    if (cargando) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0F766E]"></div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {propiedades.map(propiedad => {
                const atributos = propiedad;
                const imagenURL = atributos.Imagenes?.[0]?.formats?.small?.url || atributos.Imagenes?.[0]?.url;
                const moneda = atributos.Moneda === 'Peso' ? '$' : 'U$S';
                const isVenta = atributos.TipoOperacion?.toLowerCase() === 'venta';
                const tagText = isVenta ? 'En Venta' : 'En Alquiler';

                return (                    
                    <div 
                        key={propiedad.id} 
                        className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                        {/* Contenedor de Imagen */}
                        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                            {imagenURL ? (
                                <img 
                                    src={imagenURL} 
                                    alt={atributos.Titulo || 'Propiedad'} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    <FaHome className="text-4xl opacity-30" />
                                </div>
                            )}

                            {/* Badges superpuestos */}
                            <div className="absolute top-3 left-3 flex gap-2">
                                <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-md text-white ${
                                    isVenta ? 'bg-[#1E293B]' : 'bg-[#0F766E]'
                                }`}>
                                    {tagText}
                                </span>
                            </div>

                            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl shadow-lg border border-white/50 text-[#1E293B] font-extrabold text-xs sm:text-sm">
                                {(atributos.Valor != null && atributos.Valor > 0 && atributos.Valor !== '') 
                                    ? `${moneda} ${atributos.Valor}` 
                                    : 'Consultar valor'}
                            </div>
                        </div>
                        
                        {/* Detalle */}
                        <div className="p-5 flex flex-col justify-between flex-grow">
                            <div>
                                <h3 className="text-base font-bold text-slate-800 mb-2 truncate group-hover:text-[#0F766E] transition-colors" title={atributos.Titulo}>
                                    {atributos.Titulo || 'Inmueble destacado'}
                                </h3>
                            </div>

                            <Link 
                                to={`/propiedades/detalle/${propiedad.documentId}`}
                                className="mt-4 inline-flex items-center justify-center gap-2 w-full bg-slate-100 hover:bg-[#1E293B] text-slate-700 hover:text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-300 text-xs shadow-sm"
                            >
                                Ver Detalle Completo <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>          
    );
}

export default PropRecientes;