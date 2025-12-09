
import { Link } from 'react-router-dom'
import { FaBed, FaBath, FaHome } from 'react-icons/fa';


function Propiedades({inmuebles, cargando, error, tipoOperacion}) {

    if (cargando) {
        return <div className="text-center p-12 text-xl font-semibold text-gray-600">Cargando Propiedades...</div>;
    }

    // Manejo de estado de Error
    if (error) {
        return <div className="text-center p-12 text-xl font-bold text-red-600">{error}</div>;
    }

const titulo = tipoOperacion 
        ? `Propiedades en ${tipoOperacion.toUpperCase()}` 
        : 'Todas las Propiedades Disponibles';

       // Definimos el color del tag según el tipo disponibilidad  
         var tagColor = '';
         var Disponible = true;
                    


return (
        <div className="container mx-auto p-4 md:p-8 bg-[#F0F2ED]">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2 text-center">
                {titulo} 
            </h2>
            
         {inmuebles.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">No hay inmuebles cargados que coincidan con la búsqueda.</p>
            ) : (
                // Grid de Inmuebles (basado en el diseño anterior)
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-[#F0F2ED]">
                    {inmuebles.map(inmueble => {
                        const atributos = inmueble;
                        const imagenURL =  `http://localhost:1337${atributos.Imagenes?.[0]?.url}`;
                        
                            if (inmueble.Disponible) {
                        tagColor = 'bg-green-500';  
                        Disponible= true;
                    }
                        else{
                        tagColor = 'bg-red-500';
                        Disponible= false;
                    };
                    const documentId = inmueble.documentId;
                        return (
                            <div key={inmueble.id} className="bg-[#F0F2ED] rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden">
                                
                                <img src={imagenURL} alt={atributos.Titulo || 'Inmueble'} className="w-full h-48 object-cover" />
                                
                                <div className="p-4">
                                        <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full text-white mb-3 ${tagColor}`}>
                                        {atributos.TipoOperacion} - {Disponible ? 'Disponible' : 'No Disponible'}
                                    </span>
                                    
                    
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">{atributos.Titulo || atributos.Descripcion}</h3>
                                    <p className="text-2xl font-bold text-primary-blue mb-3">${atributos.Valor}</p>
                                    
                                    {/* Características */}
                                    <div className="flex justify-between text-gray-600 text-sm mt-3 border-t pt-3">
                                        <p className="flex items-center space-x-1">
                                            <FaHome /> <span>{atributos.Ambientes} Amb.</span>
                                        </p>
                                        <p className="flex items-center space-x-1">
                                            <FaBed /> <span>{atributos.Dormitorios} Dor.</span>
                                        </p>
                                        <p className="flex items-center space-x-1">
                                            <FaBath /> <span>{atributos.Banos} Baños</span>
                                        </p>
                                    </div>

                                 <Link 
                                      to={`/propiedades/detalle/${documentId}`} // <-- Usamos el ID del inmueble
                                      className="mt-4 w-full bg-gray-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition duration-200 block text-center"
                                    >
                                        Ver Detalles
                                    </Link>
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