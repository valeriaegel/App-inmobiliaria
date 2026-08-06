import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCheckCircle, FaChevronLeft, FaInfoCircle, FaCheckDouble } from 'react-icons/fa';
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
            const propiedadCache = (allInmuebles || []).find(p => p.documentId === documentId);

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
                if (!propiedadCache) setError("No se pudo cargar la propiedad solicitada.");
            } finally {
                setCargando(false);
            }
        };

        obtenerDetalle();
    }, [documentId, allInmuebles]);

    if (cargando && !inmueble) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F766E] mb-4"></div>
                <p className="text-slate-500 font-medium">Cargando detalles de la propiedad...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <div className="bg-rose-50 border border-rose-200 text-rose-600 p-8 rounded-3xl max-w-md mx-auto font-bold">
                    {error}
                </div>
            </div>
        );
    }

    if (!inmueble) {
        return (
            <div className="container mx-auto px-4 py-24 text-center text-slate-500 font-medium">
                La propiedad solicitada no existe o no se encuentra disponible.
            </div>
        );
    }

    const atributos = inmueble;
    const servicios = atributos.servicios || [];
    const ciudad = atributos.ciudad;
    const tipoInmueble = atributos.tipo_inmueble?.Tipo;
    const imagenes = atributos.Imagenes || [];

    const moneda = atributos.Moneda === 'Peso' ? '$' : 'U$S';

    return (
        <div className="bg-slate-50/60 min-h-screen py-8 md:py-12">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-8">
                
                {/* Botón de Retorno & Breadcrumbs */}
                <div className="flex items-center justify-between">
                    <Link 
                        to="/propiedades/Venta" 
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0F766E] transition-colors bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"
                    >
                        <FaChevronLeft className="text-[10px]" /> Volver al catálogo
                    </Link>
                </div>

                {/* Header de la Propiedad */}
                <div className="space-y-3">
                    <div className="flex flex-wrap gap-2 items-center">
                        {tipoInmueble && (
                            <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#0F766E] px-3.5 py-1 rounded-full shadow-sm">
                                {tipoInmueble}
                            </span>
                        )}
                        {atributos.TipoOperacion && (
                            <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#1E293B] px-3.5 py-1 rounded-full shadow-sm">
                                En {atributos.TipoOperacion}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] tracking-tight leading-tight">
                        {atributos.Titulo || 'Inmueble sin título'}
                    </h1>

                    <p className="text-slate-500 text-sm sm:text-base flex items-center gap-2 font-medium">
                        <FaMapMarkerAlt className="text-[#0F766E] shrink-0" />
                        <span>{atributos.Ubicacion || 'Ubicación no especificada'} {ciudad ? `— ${ciudad.Ciudad}` : ''}</span>
                    </p>
                </div>

                {/* Layout Principal (2 Columnas: Galería + Ficha / Sidebar) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Columna Izquierda (Galería, Descripción, Ubicación) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Carrusel de Fotos */}
                        <div className="bg-white p-3 rounded-3xl shadow-xl border border-slate-100 overflow-hidden z-0">
                            {imagenes.length > 0 ? (
                                <Carousel
                                    showArrows={true}
                                    showThumbs={imagenes.length > 1}
                                    showStatus={false}
                                    infiniteLoop={true}
                                    autoPlay={true}
                                    interval={5000}
                                    className="rounded-2xl overflow-hidden"
                                >
                                    {imagenes.map((img) => (
                                        <div key={img.id} className="h-[380px] sm:h-[500px] bg-slate-900 flex items-center justify-center">
                                            <img
                                                src={img.formats?.large?.url || img.url}
                                                alt={atributos.Titulo || 'Imagen de propiedad'}
                                                className="max-h-full max-w-full object-contain"
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            ) : (
                                <div className="h-[400px] bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-medium">
                                    No hay imágenes disponibles para esta propiedad.
                                </div>
                            )}
                        </div>

                        {/* Precio & CTA WhatsApp (Visibilidad exclusiva para móvil para tener acceso directo al precio y contacto) */}
                        <div className="lg:hidden">
                            <DatosPropiedad
                                disponible={atributos.Disponible}
                                valor={atributos.Valor}
                                moneda={moneda}
                                tipoOperacion={atributos.TipoOperacion}
                                Ubicacion={atributos.Ubicacion}
                            />
                        </div>

                        {/* Ficha Técnica (Superficies, Ambientes, etc.) */}
                        <FichaTecnica
                            superficieTotal={atributos.SuperficieTotal}
                            superficieConstruida={atributos.SuperficieConstruida}
                            ambientes={atributos.Ambientes}
                            dormitorios={atributos.Dormitorios}
                            banos={atributos.Banos}
                        />

                        {/* Descripción */}
                        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 space-y-4">
                            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                                <div className="p-2 bg-[#0F766E]/10 rounded-xl text-[#0F766E]">
                                    <FaInfoCircle className="text-xl" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Descripción General</h2>
                            </div>

                            <p className="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                                {atributos.Descipcion || atributos.Descripcion || 'Sin descripción detallada.'}
                            </p>
                        </div>

                        {/* Servicios e Instalaciones */}
                        {servicios.length > 0 && (
                            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 space-y-4">
                                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                                    <div className="p-2 bg-[#0F766E]/10 rounded-xl text-[#0F766E]">
                                        <FaCheckDouble className="text-xl" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800">Servicios Incluidos</h3>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                                    {servicios.map(servicio => (
                                        <div key={servicio.id} className="flex items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-medium">
                                            <FaCheckCircle className="text-emerald-500 shrink-0" />
                                            <span>{servicio.Nombre}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Mapa de Ubicación */}
                        {atributos.latitud != null && atributos.longitud != null && (
                            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 space-y-4">
                                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                                    <div className="p-2 bg-[#0F766E]/10 rounded-xl text-[#0F766E]">
                                        <FaMapMarkerAlt className="text-xl" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-800">Ubicación Geográfica</h2>
                                </div>

                                <MapaUbicacionPropiedad
                                    lat={atributos.latitud}
                                    lng={atributos.longitud}
                                    titulo={atributos.Titulo}
                                />
                            </div>
                        )}

                    </div>

                    {/* Columna Derecha (Precio & WhatsApp CTA - Visibilidad en Escritorio) */}
                    <div className="hidden lg:block lg:col-span-1 space-y-6 lg:sticky lg:top-24">
                        <DatosPropiedad
                            disponible={atributos.Disponible}
                            valor={atributos.Valor}
                            moneda={moneda}
                            tipoOperacion={atributos.TipoOperacion}
                            Ubicacion={atributos.Ubicacion}
                        />
                    </div>

                </div>

            </div>
        </div>
    );
}

export default DetallePropiedad;