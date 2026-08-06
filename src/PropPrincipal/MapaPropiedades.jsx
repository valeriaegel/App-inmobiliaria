import { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import { PropertyContext } from '../context/PropertyContext';
import { FaMapMarkedAlt } from 'react-icons/fa';

const center = [-32.4837462, -58.2315257]; // Concepción del Uruguay

const obtenerColorOperacion = (tipoOperacion) => {
    if (!tipoOperacion) return '#0F766E';
    const tipo = tipoOperacion.toLowerCase();
    if (tipo.includes('venta') && tipo.includes('alquiler')) {
        return '#D97706'; // Ámbar / Dorado para ambas
    }
    if (tipo.includes('venta')) {
        return '#1E293B'; // Azul Noche (En Venta)
    }
    if (tipo.includes('alquiler')) {
        return '#0F766E'; // Verde Teal (En Alquiler)
    }
    return '#0F766E';
};

// Pin de marca, con color distinto según el tipo de operación (Venta vs Alquiler)
const crearPin = (tipoOperacion) => {
    const colorFill = obtenerColorOperacion(tipoOperacion);
    return L.divIcon({
        className: '',
        html: `
            <div style="filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.35));">
                <svg width="34" height="44" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 0C8 0 0 8 0 18c0 13 18 28 18 28s18-15 18-28C36 8 28 0 18 0z" fill="${colorFill}"/>
                    <circle cx="18" cy="18" r="7" fill="#FFFFFF"/>
                </svg>
            </div>
        `,
        iconSize: [34, 44],
        iconAnchor: [17, 44],
        popupAnchor: [0, -38],
    });
};

function AjustarVista({ puntos }) {
    const map = useMap();
    if (puntos.length > 0) {
        const bounds = L.latLngBounds(puntos.map(p => [p.latitud, p.longitud]));
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    }
    return null;
}

function MapaPropiedades() {
    const { allInmuebles, loading } = useContext(PropertyContext);

    // Filtramos ÚNICAMENTE los inmuebles DISPONIBLES y que tengan coordenadas
    const conCoordenadas = (allInmuebles || []).filter(
        i => i.Disponible === true && i.latitud != null && i.longitud != null
    );

    if (loading) {
        return (
            <div className="h-[450px] w-full bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 font-medium">
                Cargando mapa interactivo...
            </div>
        );
    }

    return (
        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-xl border border-slate-100 flex flex-col h-full">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-2">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-[#0F766E]/10 rounded-xl text-[#0F766E]">
                        <FaMapMarkedAlt className="text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Ubicación de Inmuebles</h3>
                </div>
                <span className="text-xs font-semibold text-[#0F766E] bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                    {conCoordenadas.length} disponibles marcados
                </span>
            </div>

            {/* Leyenda de Colores */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600 mb-3 px-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#1E293B] shadow-sm inline-block"></span>
                    <span>En Venta</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0F766E] shadow-sm inline-block"></span>
                    <span>En Alquiler</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#D97706] shadow-sm inline-block"></span>
                    <span>Venta y Alquiler</span>
                </div>
            </div>

            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-inner border border-slate-200 z-0 isolate">
                <MapContainer
                    center={center}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    />

                    {conCoordenadas.length > 0 && <AjustarVista puntos={conCoordenadas} />}

                    {conCoordenadas.map(inmueble => {
                        const moneda = inmueble.Moneda === 'Peso' ? '$' : 'U$S';
                        return (
                            <Marker
                                key={inmueble.id}
                                position={[inmueble.latitud, inmueble.longitud]}
                                icon={crearPin(inmueble.TipoOperacion)}
                            >
                                <Popup>
                                    <div className="w-48 p-1">
                                        {inmueble.Imagenes?.[0]?.url && (
                                            <img
                                                src={inmueble.Imagenes[0].url}
                                                alt={inmueble.Titulo}
                                                className="w-full h-24 object-cover rounded-xl mb-2"
                                            />
                                        )}
                                        <div className="mb-1 flex items-center justify-between">
                                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded text-white bg-slate-800">
                                                {inmueble.TipoOperacion || 'Inmueble'}
                                            </span>
                                        </div>
                                        <p className="font-bold text-sm text-slate-800 leading-tight mb-1">{inmueble.Titulo}</p>
                                        <p className="text-sm font-extrabold text-[#0F766E] mb-2">
                                            {(inmueble.Valor != null && inmueble.Valor > 0 && inmueble.Valor !== '') 
                                                ? `${moneda} ${inmueble.Valor}` 
                                                : 'Consultar valor'}
                                        </p>
                                        <Link
                                            to={`/propiedades/detalle/${inmueble.documentId}`}
                                            className="block text-center bg-[#1E293B] text-white text-xs font-bold py-1.5 px-3 rounded-lg hover:bg-[#0F766E] transition-colors"
                                        >
                                            Ver detalle →
                                        </Link>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>
        </div>
    );
}

export default MapaPropiedades;