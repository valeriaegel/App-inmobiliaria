import { Link } from 'react-router-dom'
import { FaBed, FaBath, FaHome } from 'react-icons/fa';

/*
  * Componente para mostrar una lista de propiedades inmobiliarias (FILTRADAS POR OPRACION).
*/

function Propiedades({inmuebles, cargando, error, tipoOperacion}) {
    //recibe como props el tipo de operacion para filtrar las propiedades
    if (cargando) {
        return <div className="text-center p-12 text-xl font-semibold text-gray-600">Cargando Propiedades...</div>;
    }
    if (error) {
        return <div className="text-center p-12 text-xl font-bold text-red-600">{error}</div>;
    }

    const titulo = tipoOperacion 
        ? `Propiedades en ${tipoOperacion.toLowerCase()}` 
        : 'Todas las Propiedades Disponibles';
       // Color del tag según el tipo disponibilidad  
         var tagColor = '';
         var Disponible = true;
         var moneda = '';
                    
    return (
        <div className="container mx-auto p-4 md:p-8 bg-[#F0F2ED]">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800 border-b pb-2 text-center">
                {titulo} 
            </h2>
            
         {inmuebles.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">No hay inmuebles cargados que coincidan con la búsqueda.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-[#F0F2ED]">
                    {inmuebles.map(inmueble => {
                        const atributos = inmueble;
                        const imagenURL =  `${atributos.Imagenes?.[0]?.url}`;
                        
                        if (atributos.Moneda === 'Peso') {
                            moneda='$';
                        } else {
                            moneda='U$D';
                        }
                            
                        
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
                                         {Disponible ? 'Disponible' : 'No Disponible'}
                                        </span>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">{atributos.Titulo || atributos.Descripcion}</h3>
                                        <p className="text-2xl font-bold text-primary-blue mb-3">
                                            {moneda}{atributos.Valor}</p>
                                        {/* Características- Chequea que no sean nulas */}
                                        <div className="flex justify-between text-gray-600 text-sm mt-3 border-t pt-3">
                                        {atributos.Ambientes==! null&& (
                                            <p className="flex items-center space-x-1">
                                                <FaHome /> <span>{atributos.Ambientes} Amb.</span> </p>)}
                                        {atributos.Dormitorios ==! null && (
                                            <p className="flex items-center space-x-1">
                                                <FaBed /> <span>{atributos.Dormitorios} Dor.</span>  </p>)}
                                        {atributos.Banos ==! null && (
                                        <p className="flex items-center space-x-1">
                                            <FaBath /> <span>{atributos.Banos} Baños</span></p>)}
                                    </div>

                                    <Link 
                                      to={`/propiedades/detalle/${documentId}`} // <-- Usamos el ID del inmueble
                                      className="mt-4 w-full bg-[#253E57] hover:bg-[#AAAAA8] text-gray-100 hover:text-[#253E57] font-bold py-2 px-4 rounded transition duration-200 block text-center" >
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