import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Solución para que los pines de Leaflet se vean correctamente en Vite/React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function Propiedades({ inmuebles, cargando, error, tipoOperacion }) {
    if (cargando) {
        return <div className="text-center p-12 text-xl font-semibold text-gray-600">Cargando Propiedades...</div>;
    }
    if (error) {
        return <div className="text-center p-12 text-xl font-bold text-red-600">{error}</div>;
    }

    const titulo = tipoOperacion 
        ? `Propiedades en ${tipoOperacion.toLowerCase()}` 
        : 'Todas las Propiedades Disponibles';

    // Coordenadas centrales para el mapa (Concepción del Uruguay)
    const centerPosition = [-32.4825, -58.2372];

    return (
        <div className="container mx-auto p-4 md:p-8 bg-gray-50 rounded-xl">
            <h2 className="text-3xl font-bold mb-8 text-[#253E57] border-b-2 border-gray-200 pb-4 text-center">
                {titulo} 
            </h2>

            {inmuebles.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">No hay inmuebles cargados que coincidan con la búsqueda.</p>
            ) : (
                <div className="flex flex-col gap-8">
                    

                    {/* GRILLA DE TARJETAS REDISEÑADA */}
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {inmuebles.map(inmueble => {
                            const atributos = inmueble;
                            const imagenURL = `${atributos.Imagenes?.[0]?.url}`;
                            const moneda = atributos.Moneda === 'Peso' ? '$' : 'U$S';
                            const Disponible = inmueble.Disponible;
                            const documentId = inmueble.documentId;

                            return (
                                <div key={inmueble.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group">
                                    
                                    {/* Contenedor de Imagen con Tag superpuesto */}
                                    <div className="relative overflow-hidden h-56">
                                        <img 
                                            src={imagenURL} 
                                            alt={atributos.Titulo || 'Inmueble'} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-md shadow-sm text-white ${Disponible ? 'bg-green-600' : 'bg-red-500'}`}>
                                                {Disponible ? 'Disponible' : 'No Disponible'}
                                            </span>
                                            {atributos.TipoOperacion && (
                                                <span className="px-3 py-1 text-xs font-bold rounded-md shadow-sm bg-[#253E57] text-white">
                                                    {atributos.TipoOperacion}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Cuerpo de la Tarjeta */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        <h3 className="text-lg font-bold text-gray-800 mb-1 truncate" title={atributos.Titulo || atributos.Descripcion}>
                                            {atributos.Titulo || atributos.Descripcion}
                                        </h3>
                                        
                                        {/* Precio destacado */}
                                        <p className="text-2xl font-extrabold text-[#253E57] mb-4">
                                            {moneda} {atributos.Valor}
                                        </p>

                                        {/* Amenities */}
                                        <div className="flex justify-between items-center text-gray-500 text-sm mt-auto border-t border-gray-100 pt-4 mb-4">
                                            {atributos.Ambientes != null && (
                                                <div className="flex flex-col items-center" title="Ambientes">
                                                    <FaHome className="text-gray-400 mb-1 text-lg" />
                                                    <span className="font-semibold">{atributos.Ambientes} Amb.</span>
                                                </div>
                                            )}
                                            {atributos.Dormitorios != null && (
                                                <div className="flex flex-col items-center" title="Dormitorios">
                                                    <FaBed className="text-gray-400 mb-1 text-lg" />
                                                    <span className="font-semibold">{atributos.Dormitorios} Dor.</span>
                                                </div>
                                            )}
                                            {atributos.Banos != null && (
                                                <div className="flex flex-col items-center" title="Baños">
                                                    <FaBath className="text-gray-400 mb-1 text-lg" />
                                                    <span className="font-semibold">{atributos.Banos} Baños</span>
                                                </div>
                                            )}
                                        </div>

                                        <Link 
                                            to={`/propiedades/detalle/${documentId}`} 
                                            className="w-full bg-[#253E57] hover:bg-[#1a2d40] text-white font-bold py-3 px-4 rounded-lg transition duration-200 block text-center shadow-sm"
                                        >
                                            Ver Detalles
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Propiedades;