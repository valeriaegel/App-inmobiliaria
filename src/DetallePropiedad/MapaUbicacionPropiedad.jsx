import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';

// Pin personalizado con los colores de marca, en vez del ícono azul por defecto de Leaflet
const pinPropiedad = L.divIcon({
    className: '',
    html: `
        <svg width="36" height="46" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 0C8 0 0 8 0 18c0 13 18 28 18 28s18-15 18-28C36 8 28 0 18 0z" fill="#1B2E42"/>
            <circle cx="18" cy="18" r="7" fill="#C9A961"/>
        </svg>
    `,
    iconSize: [36, 46],
    iconAnchor: [18, 46],
    popupAnchor: [0, -40],
});

function MapaUbicacionPropiedad({ lat, lng, titulo }) {
    if (lat == null || lng == null) return null;

    const position = [lat, lng];

    return (
        <div className="h-[350px] w-full rounded-lg overflow-hidden shadow-md">
            <MapContainer
                center={position}
                zoom={17}
                minZoom={15}
                maxZoom={19}
                scrollWheelZoom={false}
                zoomControl={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                <ZoomControl position="bottomright" />
                <Marker position={position} icon={pinPropiedad}>
                    <Popup>{titulo}</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default MapaUbicacionPropiedad;