
import { Link } from 'react-router-dom';


const STRAPI_BASE_URL = 'http://localhost:1337';

function PropRecientes({ propiedades, cargando, error }) {
    
    if (cargando) {
        return <div className="text-center p-10 text-lg">Cargando Propiedades Destacadas...</div>;
    }
    
    if (error) {
        return <div className="text-center p-10 text-lg font-bold text-red-600">{error}</div>;
    }

    if (propiedades.length === 0) {
        return <div className="text-center p-10 text-lg text-gray-500">No hay propiedades destacadas disponibles.</div>;
    }
    
    const propiedadesVisibles = propiedades.slice(0, 2);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {propiedadesVisibles.map(propiedad => {
                // La propiedad ya es el objeto { id, documentId, attributes: {...} }
                const atributos = propiedad;
                
                // Lógica para obtener la imagen principal
                const imagenPath = atributos.Imagenes?.[0]?.url;
                const imagenURL = imagenPath 
                                    ? `${STRAPI_BASE_URL}${imagenPath}` 
                                    : '/placeholder-image.jpg';

                // Determinar tipo de operación y color del tag (similar al de la imagen)
                const isVenta = atributos.TipoOperacion?.toLowerCase() === 'venta';
                const tagText = isVenta ? 'En Venta' : 'En Alquiler';
                const tagClass = isVenta ? 'bg-[#253E57]' : 'bg-[#253E57]';

                return (
                    
                    <div key={propiedad.id} className="bg-[#C6CFCC] rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                        
                        {/* IMAGEN Y TAG */}
                        <div className="relative h-30 w-full">
                            <img src={imagenURL} alt={atributos.Titulo} className="w-full h-full object-cover" />
                            <span className={`absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded ${tagClass}`}>
                                {tagText}
                            </span>
                        </div>
                        
                        {/* CONTENIDO */}
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 truncate">{atributos.Titulo}</h3>
                                                                              
                            {/* BOTÓN VER DETALLES */}
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