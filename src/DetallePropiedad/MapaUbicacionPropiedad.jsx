import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';

const pinPropiedad = L.divIcon({
    className: '',
    html: `
        <div style="filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.35));">
            <svg width="38" height="48" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 0C8 0 0 8 0 18c0 13 18 28 18 28s18-15 18-28C36 8 28 0 18 0z" fill="#0F766E"/>
                <circle cx="18" cy="18" r="7" fill="#FFFFFF"/>
            </svg>
        </div>
    `,
    iconSize: [38, 48],
    iconAnchor: [19, 48],
    popupAnchor: [0, -42],
});

function MapaUbicacionPropiedad({ lat, lng, titulo }) {
    if (lat == null || lng == null) return null;

    const position = [lat, lng];

    return (
        <div className="relative h-[380px] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 z-0 isolate">
            <MapContainer
                center={position}
                zoom={17}
                minZoom={14}
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
                    <Popup>
                        <span className="font-bold text-slate-800 text-xs">{titulo}</span>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default MapaUbicacionPropiedad;