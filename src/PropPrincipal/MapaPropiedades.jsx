import { useContext, useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, Pin, useMap } from '@vis.gl/react-google-maps';
import { Link } from 'react-router-dom';
import { PropertyContext } from '../context/PropertyContext';
import { FaMapMarkedAlt } from 'react-icons/fa';

const center = { lat: -32.4837462, lng: -58.2315257 }; // Concepción del Uruguay

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

function AjustarVistaGoogle({ puntos }) {
    const map = useMap();
    const [ajustado, setAjustado] = useState(false);

    useEffect(() => {
        if (!map || puntos.length === 0 || ajustado) return;
        if (typeof window.google === 'undefined' || !window.google.maps) return;

        const bounds = new window.google.maps.LatLngBounds();
        let validPoints = 0;

        puntos.forEach(p => {
            const lat = parseFloat(p.latitud);
            const lng = parseFloat(p.longitud);
            if (!isNaN(lat) && !isNaN(lng)) {
                bounds.extend({ lat, lng });
                validPoints++;
            }
        });

        if (validPoints > 0) {
            map.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 });
            setAjustado(true);
        }
    }, [map, puntos, ajustado]);

    return null;
}

function MapaPropiedades() {
    const { allInmuebles, loading } = useContext(PropertyContext);
    const [selectedInmueble, setSelectedInmueble] = useState(null);
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    // Filtramos ÚNICAMENTE los inmuebles DISPONIBLES y que tengan coordenadas válidas
    const conCoordenadas = (allInmuebles || []).filter(
        i => i.Disponible === true &&
             i.latitud != null && !isNaN(parseFloat(i.latitud)) &&
             i.longitud != null && !isNaN(parseFloat(i.longitud))
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

            <div className="relative h-[420px] w-full rounded-2xl overflow-hidden shadow-inner border border-slate-200 z-0 isolate">
                <APIProvider apiKey={API_KEY}>
                    <Map
                        style={{ width: '100%', height: '100%' }}
                        defaultCenter={center}
                        defaultZoom={14}
                        mapId="MAPA_PROPIEDADES_PRINCIPAL"
                        gestureHandling="greedy"
                        reuseMaps={true}
                        zoomControl={true}
                        mapTypeControl={true}
                        streetViewControl={true}
                    >
                        <AjustarVistaGoogle puntos={conCoordenadas} />

                        {conCoordenadas.map(inmueble => {
                            const lat = parseFloat(inmueble.latitud);
                            const lng = parseFloat(inmueble.longitud);
                            const colorFill = obtenerColorOperacion(inmueble.TipoOperacion);

                            return (
                                <AdvancedMarker
                                    key={inmueble.id}
                                    position={{ lat, lng }}
                                    title={inmueble.Titulo}
                                    onClick={() => setSelectedInmueble(inmueble)}
                                >
                                    <Pin
                                        background={colorFill}
                                        borderColor="#FFFFFF"
                                        glyphColor="#FFFFFF"
                                        scale={1.1}
                                    />
                                </AdvancedMarker>
                            );
                        })}

                        {selectedInmueble && (
                            <InfoWindow
                                position={{
                                    lat: parseFloat(selectedInmueble.latitud),
                                    lng: parseFloat(selectedInmueble.longitud)
                                }}
                                onCloseClick={() => setSelectedInmueble(null)}
                            >
                                <div className="w-48 p-1">
                                    {selectedInmueble.Imagenes?.[0]?.url && (
                                        <img
                                            src={selectedInmueble.Imagenes[0].url}
                                            alt={selectedInmueble.Titulo}
                                            className="w-full h-24 object-cover rounded-xl mb-2"
                                        />
                                    )}
                                    <div className="mb-1 flex items-center justify-between">
                                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded text-white bg-slate-800">
                                            {selectedInmueble.TipoOperacion || 'Inmueble'}
                                        </span>
                                    </div>
                                    <p className="font-bold text-sm text-slate-800 leading-tight mb-1">{selectedInmueble.Titulo}</p>
                                    <p className="text-sm font-extrabold text-[#0F766E] mb-2">
                                        {(selectedInmueble.Valor != null && selectedInmueble.Valor > 0 && selectedInmueble.Valor !== '') 
                                            ? `${selectedInmueble.Moneda === 'Peso' ? '$' : 'U$S'} ${selectedInmueble.Valor}` 
                                            : 'Consultar valor'}
                                    </p>
                                    <Link
                                        to={`/propiedades/detalle/${selectedInmueble.documentId}`}
                                        className="block text-center bg-[#1E293B] text-white text-xs font-bold py-1.5 px-3 rounded-lg hover:bg-[#0F766E] transition-colors"
                                    >
                                        Ver detalle →
                                    </Link>
                                </div>
                            </InfoWindow>
                        )}
                    </Map>
                </APIProvider>
            </div>
        </div>
    );
}

export default MapaPropiedades;