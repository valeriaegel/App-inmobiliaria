import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { FaHome, FaExternalLinkAlt } from 'react-icons/fa';
import { normalizarCoordenada } from '../utils/coordenadas';

function MapaPropiedad({ lat, lng, titulo }) {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const [openInfo, setOpenInfo] = useState(false);

    const numericLat = normalizarCoordenada(lat, true);
    const numericLng = normalizarCoordenada(lng, false);

    if (numericLat === null || numericLng === null) return null;

    const position = { lat: numericLat, lng: numericLng };
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${numericLat},${numericLng}`;

    return (
        <div className="relative h-[420px] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 z-0 isolate group">
            {/* Botón flotante para abrir ruta directa en Google Maps */}
            <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 z-10 inline-flex items-center gap-2 bg-white/95 hover:bg-white text-slate-700 hover:text-[#0F766E] font-extrabold text-xs px-3.5 py-2.5 rounded-2xl shadow-lg border border-slate-200 backdrop-blur-md btn-press transition-all cursor-pointer"
            >
                <FaExternalLinkAlt className="text-[10px]" />
                <span>Abrir en Google Maps</span>
            </a>

            <APIProvider apiKey={API_KEY}>
                <Map
                    style={{ width: '100%', height: '100%' }}
                    defaultCenter={position}
                    defaultZoom={16}
                    mapId="DETALLE_PROPIEDAD_MAP"
                    gestureHandling="greedy"
                    reuseMaps={true}
                    zoomControl={true}
                    mapTypeControl={true}
                    streetViewControl={true}
                >
                    <AdvancedMarker
                        position={position}
                        title={titulo}
                        onClick={() => setOpenInfo(prev => !prev)}
                    >
                        {/* Marcador Personalizado de Alta Visibilidad */}
                        <div className="relative flex flex-col items-center cursor-pointer group/pin -translate-y-2 select-none">
                            {/* Halo / Radar de pulso continuo para destacar inmediatamente */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#0F766E]/30 rounded-full animate-ping pointer-events-none"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-400/40 rounded-full animate-pulse pointer-events-none"></div>

                            {/* Badge Principal del Pin */}
                            <div className="relative z-10 flex items-center gap-2 bg-[#0F766E] group-hover/pin:bg-[#0D9488] text-white px-4 py-2 rounded-full shadow-2xl border-2 border-white transform transition-all group-hover/pin:scale-110">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-pulse"></span>
                                <FaHome className="text-sm text-white" />
                                <span className="font-extrabold text-xs tracking-wide whitespace-nowrap drop-shadow-sm">
                                    Propiedad aquí
                                </span>
                            </div>

                            {/* Flecha inferior del Pin apuntando a la coordenada */}
                            <div className="w-3.5 h-3.5 bg-[#0F766E] group-hover/pin:bg-[#0D9488] rotate-45 border-r-2 border-b-2 border-white -mt-2 shadow-md"></div>
                            <div className="w-2 h-2 bg-slate-900 rounded-full mt-0.5 shadow-sm border border-white"></div>
                        </div>
                    </AdvancedMarker>

                    {openInfo && (
                        <InfoWindow
                            position={position}
                            onCloseClick={() => setOpenInfo(false)}
                            pixelOffset={[0, -45]}
                        >
                            <div className="p-2 min-w-[190px] max-w-[250px] space-y-1.5">
                                <p className="font-extrabold text-slate-800 text-xs leading-snug">{titulo}</p>
                                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0F766E]">
                                    <span>✓ Ubicación verificada</span>
                                </div>
                                <a
                                    href={googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-[11px] font-extrabold text-[#0F766E] hover:underline pt-0.5"
                                >
                                    Cómo llegar ↗
                                </a>
                            </div>
                        </InfoWindow>
                    )}
                </Map>
            </APIProvider>
        </div>
    );
}

export default MapaPropiedad;
