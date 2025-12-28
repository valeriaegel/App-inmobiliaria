import { Link } from 'react-router-dom';

function PropRecientes({ propiedades, cargando, error }) {  
    if (cargando) {
        return <div className="text-center p-10 text-lg">Cargando Propiedades Destacadas...</div>;
    }
    if (error) {
        return <div className="text-center p-10 text-lg font-bold text-red-600">{error}</div>;
    }
    if (propiedades.length === 0) {
        return <div className="text-center p-10 text-lg text-gray-500">No hay propiedades disponibles.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {propiedades.map(propiedad => {
                const atributos = propiedad;
                const imagenURL = atributos.Imagenes?.[0]?.formats?.small?.url || atributos.Imagenes?.[0]?.url;
                
                const isVenta = atributos.TipoOperacion?.toLowerCase() === 'venta';
                const tagText = isVenta ? 'En Venta' : 'En Alquiler';

                return (                    
                    <div key={propiedad.id} className="bg-[#C6CFCC] rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                        
                        {/* IMAGEN: object-contain para ver la foto completa */}
                        <div className="relative h-48 w-full bg-gray-200 flex items-center justify-center">
                            <img 
                                src={imagenURL} 
                                alt={atributos.Titulo} 
                                className="max-w-full max-h-full object-contain" 
                            />
                            <span className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded bg-[#253E57]">
                                {tagText}
                            </span>
                        </div>
                        
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 truncate">{atributos.Titulo}</h3>
                            <Link 
                                to={`/propiedades/detalle/${propiedad.documentId}`}
                                className="mt-4 block text-center bg-[#253E57] hover:bg-gray-400 text-gray-100 font-semibold py-2 rounded transition"
                            >
                                Ver Detalles
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>          
    );
}

export default PropRecientes;