import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FichaTecnica from './FichaTecnica';
import DatosPropiedad from './DatosPropiedad';
import MapaUbicacionPropiedad from './MapaUbicacionPropiedad';
import { fetchFromStrapi } from '../context/api';
import { PropertyContext } from '../context/PropertyContext';

function DetallePropiedad() {
    const { documentId } = useParams();
    const [inmueble, setInmueble] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const { allInmuebles } = useContext(PropertyContext);

    useEffect(() => {
        const obtenerDetalle = async () => {
            const propiedadCache = allInmuebles.find(p => p.documentId === documentId);

            if (propiedadCache) {
                setInmueble(propiedadCache);
                setCargando(false);
            }

            const API_URL = `/api/inmuebles/${documentId}?populate=*`;

            try {
                const respuesta = await fetchFromStrapi(API_URL);
                if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

                const datos = await respuesta.json();
                setInmueble(datos.data);
            } catch (err) {
                console.error("Error al obtener el detalle:", err);
                if (!propiedadCache) setError("No se pudo cargar el detalle.");
            } finally {
                setCargando(false);
            }
        };

        obtenerDetalle();
    }, [documentId, allInmuebles]);

    if (cargando && !inmueble) return <div className="text-center p-20 text-xl text-brand-muted">Cargando detalles...</div>;
    if (error) return <div className="text-center p-20 text-xl font-bold text-red-600">{error}</div>;
    if (!inmueble) return <div className="text-center p-20 text-xl text-brand-muted">Propiedad no encontrada.</div>;

    const atributos = inmueble;
    const servicios = atributos.servicios || [];
    const ciudad = atributos.ciudad;
    const tipoInmueble = atributos.tipo_inmueble?.Tipo;
    const imagenes = atributos.Imagenes || [];

    const moneda = atributos.Moneda === 'Peso' ? '$' : 'U$S';

    return (
        <div className="mx-auto p-4 md:p-12 bg-brand-bg">
            <h1 className="text-4xl font-extrabold text-primary-blue mb-2">{atributos.Titulo}</h1>
            <p className="text-lg text-brand-muted mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-brand-accent" />
                <span>{atributos.Ubicacion} {ciudad ? `— ${ciudad.Ciudad}` : ''}</span>
            </p>

            {tipoInmueble && (
                <p className="text-sm font-semibold text-primary-blue mb-6 inline-block bg-brand-accent/20 px-3 py-1 rounded-full">
                    {tipoInmueble}
                </p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="rounded-lg shadow-xl overflow-hidden mb-6">
                        {imagenes.length > 0 ? (
                            <Carousel
                                showArrows={true}
                                showThumbs={false}
                                showStatus={false}
                                infiniteLoop={true}
                                autoPlay={true}
                            >
                                {imagenes.map((img) => (
                                    <div key={img.id}>
                                        <img
                                            src={img.formats?.large?.url || img.url}
                                            alt={atributos.Titulo}
                                            className="w-full h-[500px] object-contain bg-black/5"
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        ) : (
                            <img src="/placeholder-image.jpg" alt="Sin imágenes" className="w-full h-[500px] object-cover" />
                        )}
                    </div>

                    <h2 className="text-2xl font-bold mb-3 text-primary-blue border-b border-black/10 pb-2">Descripción</h2>
                    <p className="text-gray-700 leading-relaxed mb-8">{atributos.Descipcion || atributos.Descripcion}</p>

                    {/* Mapa de ubicación de la propiedad */}
                    {atributos.latitud != null && atributos.longitud != null && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-3 text-primary-blue border-b border-black/10 pb-2">Ubicación</h2>
                            <MapaUbicacionPropiedad
                                lat={atributos.latitud}
                                lng={atributos.longitud}
                                titulo={atributos.Titulo}
                            />
                        </div>
                    )}
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <DatosPropiedad
                        disponible={atributos.Disponible}
                        valor={atributos.Valor}
                        moneda={moneda}
                        tipoOperacion={atributos.TipoOperacion}
                        Ubicacion={atributos.Ubicacion}
                    />
                    <FichaTecnica
                        superficieTotal={atributos.SuperficieTotal}
                        superficieConstruida={atributos.SuperficieConstruida}
                        ambientes={atributos.Ambientes}
                        dormitorios={atributos.Dormitorios}
                        banos={atributos.Banos}
                    />

                    {servicios.length > 0 && (
                        <div className="bg-brand-surface p-6 rounded-lg shadow-md border border-black/5">
                            <h3 className="text-xl font-semibold mb-4 text-primary-blue">Servicios</h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                {servicios.map(servicio => (
                                    <span key={servicio.id} className="flex items-center text-gray-700">
                                        <FaCheckCircle className="text-emerald-600 mr-2" /> {servicio.Nombre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetallePropiedad;