import { APIProvider, Map, AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';
import { useState } from 'react';

function MapaPropiedad({ lat, lng, titulo }) {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const [openInfo, setOpenInfo] = useState(true);

    const numericLat = parseFloat(lat);
    const numericLng = parseFloat(lng);

    if (isNaN(numericLat) || isNaN(numericLng)) return null;

    const position = { lat: numericLat, lng: numericLng };

    return (
        <div className="relative h-[380px] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 z-0 isolate">
            <APIProvider apiKey={API_KEY}>
                <Map
                    style={{ width: '100%', height: '100%' }}
                    defaultCenter={position}
                    defaultZoom={17}
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
                        onClick={() => setOpenInfo(true)}
                    >
                        <Pin
                            background="#0F766E"
                            borderColor="#FFFFFF"
                            glyphColor="#FFFFFF"
                            scale={1.2}
                        />
                    </AdvancedMarker>

                    {openInfo && (
                        <InfoWindow
                            position={position}
                            onCloseClick={() => setOpenInfo(false)}
                        >
                            <div className="p-1 max-w-[200px]">
                                <p className="font-bold text-slate-800 text-xs leading-tight mb-1">{titulo}</p>
                                <span className="text-[10px] font-semibold text-[#0F766E]">Ubicación verificada</span>
                            </div>
                        </InfoWindow>
                    )}
                </Map>
            </APIProvider>
        </div>
    );
}

export default MapaPropiedad;
