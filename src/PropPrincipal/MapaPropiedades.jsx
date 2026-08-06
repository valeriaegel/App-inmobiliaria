import { useContext, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import { PropertyContext } from '../context/PropertyContext';

const center = [-32.4837462, -58.2315257]; // Concepción del Uruguay

// Pin de marca, con color distinto según disponibilidad
const crearPin = (disponible) => L.divIcon({
    className: '',
    html: `
        <svg width="32" height="42" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 0C8 0 0 8 0 18c0 13 18 28 18 28s18-15 18-28C36 8 28 0 18 0z" fill="${disponible ? '#1B2E42' : '#8A9199'}"/>
            <circle cx="18" cy="18" r="7" fill="#C9A961"/>
        </svg>
    `,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -36],
});

// Ajusta automáticamente el zoom/centro para que entren todos los markers
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

    const conCoordenadas = (allInmuebles || []).filter(
        i => i.latitud != null && i.longitud != null
    );

    if (loading) {
        return <div className="text-center p-12 text-brand-muted">Cargando mapa...</div>;
    }

    return (
        <div className="h-full w-full min-h-[500px] rounded-xl overflow-hidden shadow-md">
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
                            icon={crearPin(inmueble.Disponible)}
                        >
                            <Popup>
                                <div className="w-40">
                                    <img
                                        src={inmueble.Imagenes?.[0]?.url}
                                        alt={inmueble.Titulo}
                                        className="w-full h-20 object-cover rounded mb-2"
                                    />
                                    <p className="font-semibold text-sm text-primary-blue truncate">{inmueble.Titulo}</p>
                                    <p className="text-sm font-bold text-primary-blue mb-2">
                                        {moneda} {inmueble.Valor ?? '—'}
                                    </p>
                                    <Link
                                        to={`/propiedades/detalle/${inmueble.documentId}`}
                                        className="text-xs text-brand-accent font-semibold"
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
    );
}

export default MapaPropiedades;