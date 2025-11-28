import React, { useMemo } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';


// Configuración de estilos para el contenedor del mapa
const containerStyle = {
    width: '100%',
    height: '500px', // Altura fija para que el mapa sea visible
    borderRadius: '0.75rem' // rounded-xl de Tailwind
};

// 💡 NOTA: DEBES REEMPLAZAR ESTOS VALORES CON LAS COORDENADAS REALES DE TU OFICINA
const officeCoords = {
    lat: -32.4837462, // Latitud de Buenos Aires (ejemplo)
    lng: -58.2315257  // Longitud de Buenos Aires (ejemplo)
};

/**
 * Componente que renderiza el mapa de Google Maps con la ubicación de la oficina.
 */
function MapaOficina() {
    // 1. Cargar la API de Google Maps
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; 

    const { isLoaded, loadError } = useJsApiLoader({
        // ⚠️ CORRECCIÓN CLAVE: Usar la sintaxis de Vite
        googleMapsApiKey: API_KEY, 
    });
    // 2. Definir el centro del mapa (Memoization para optimizar)
    const center = useMemo(() => officeCoords, []);

    // 3. Manejar el estado de carga
    if (loadError) {
        return <div className="p-8 bg-red-100 text-red-800 rounded-lg">Error al cargar Google Maps. Revisa tu API Key.</div>;
    }

    if (!isLoaded) {
        return <div className="p-8 bg-gray-200 text-gray-700 rounded-lg">Cargando mapa...</div>;
    }

    // 4. Renderizar el Mapa
    return (
        <div className="rounded-xl shadow-2xl overflow-hidden">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15} // Nivel de zoom adecuado para una oficina
                options={{
                    disableDefaultUI: false, // Puedes habilitar/deshabilitar controles aquí
                    zoomControl: true,
                }}
            >
                {/* 5. Colocar el Marcador en la ubicación de la oficina */}
                <MarkerF 
                    position={officeCoords} 
                    title="Oficina Central Inmobiliaria"
                />
            </GoogleMap>
        </div>
    );
}

export default MapaOficina;