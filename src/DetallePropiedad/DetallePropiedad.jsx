import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import {   
    FaMapMarkerAlt, FaChevronLeft, 
    FaInfoCircle, FaCheckDouble, FaRulerCombined, FaBed, FaBath, FaHome, FaArrowRight,
    FaWhatsapp, FaShareAlt, FaCheck, FaCheckCircle
} from 'react-icons/fa';
import { PropertyContext } from '../context/PropertyContext';
import { propertyService } from '../services/propertyService';
import { capitalizarTitulo } from '../utils/formatearTexto';
import { obtenerIconoServicio } from '../utils/serviciosIcons';
import { formatearPrecio } from '../utils/formatearPrecio';
import { generarLinkWhatsApp } from '../utils/funContacto';
import { useToast } from '../context/ToastContext';

// Componentes modulares internos
import GaleriaInmueble from './GaleriaInmueble';
import FichaTecnica from './FichaTecnica';
import MapaPropiedad from './MapaPropiedad';
import PropiedadesSimilares from './PropiedadesSimilares';

function DetallePropiedad() {
    const { documentId } = useParams();
    const [inmueble, setInmueble] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [copiado, setCopiado] = useState(false);

    const { allInmuebles } = useContext(PropertyContext);
    const { mostrarToast } = useToast();

    useEffect(() => {
        let isMounted = true;
        const obtenerDetalle = async () => {
            const propiedadCache = (allInmuebles || []).find(p => p.documentId === documentId);

            if (propiedadCache && isMounted) {
                setInmueble(propiedadCache);
                setCargando(false);
            }

            try {
                const data = await propertyService.fetchDetalleInmueble(documentId);
                if (isMounted) setInmueble(data);
            } catch (err) {
                console.error("Error al obtener el detalle:", err);
                if (isMounted && !propiedadCache) setError("No se pudo cargar la propiedad solicitada.");
            } finally {
                if (isMounted) setCargando(false);
            }
        };

        obtenerDetalle();
        return () => { isMounted = false; };
    }, [documentId, allInmuebles]);

    // Subir suavemente al tope al cambiar de propiedad
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [documentId]);

    if (cargando && !inmueble) {
        return (
            <div className="bg-slate-50/60 min-h-screen py-8 md:py-12">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-8">
                    <div className="h-9 w-44 skeleton-shimmer rounded-full"></div>
                    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-100 space-y-4">
                        <div className="h-6 w-32 skeleton-shimmer rounded-full"></div>
                        <div className="h-8 w-2/3 skeleton-shimmer rounded-xl"></div>
                        <div className="h-4 w-1/3 skeleton-shimmer rounded-lg"></div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 h-[420px] skeleton-shimmer rounded-3xl"></div>
                        <div className="h-[360px] skeleton-shimmer rounded-3xl"></div>
                    </div>
                </div>
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
    const operacionUrl = atributos.TipoOperacion ? `/propiedades/${atributos.TipoOperacion}` : '/propiedades/Venta';
    const tituloFormateado = capitalizarTitulo(atributos.Titulo) || 'Inmueble sin título';

    const monedaSimbolo = atributos.Moneda === 'Peso' ? '$' : 'U$S';
    const whatsappLink = generarLinkWhatsApp(atributos.Ubicacion, atributos.TipoOperacion, tituloFormateado);
    const tienePrecio = atributos.Valor != null && atributos.Valor > 0 && atributos.Valor !== '';
    const textoPrecio = formatearPrecio(atributos.Valor, monedaSimbolo);

    const handleCompartir = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: tituloFormateado,
                    text: `Mirá esta propiedad en ${atributos.TipoOperacion || 'inmobiliaria'}: ${tituloFormateado}`,
                    url: window.location.href,
                });
            } catch (err) {
                if (err.name !== 'AbortError') console.error(err);
            }
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopiado(true);
            mostrarToast('¡Enlace copiado al portapapeles!', 'success');
            setTimeout(() => setCopiado(false), 2500);
        }
    };

    return (
        <div className="bg-slate-50/60 min-h-screen py-8 md:py-12 animate-in fade-in duration-300">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-8">
                
                {/* Botón de Retorno & Breadcrumbs */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Link 
                        to={operacionUrl}
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0F766E] transition-colors bg-white px-4 py-2.5 rounded-full border border-slate-200 shadow-sm hover:shadow-md btn-press cursor-pointer"
                    >
                        <FaChevronLeft className="text-[10px]" /> Volver a {atributos.TipoOperacion ? `Propiedades en ${atributos.TipoOperacion}` : 'Catálogo'}
                    </Link>

                    {/* Breadcrumbs */}
                    <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-400">
                        <Link to="/" className="hover:text-[#0F766E] transition-colors">Inicio</Link>
                        <span>/</span>
                        <Link to={operacionUrl} className="hover:text-[#0F766E] transition-colors">
                            {atributos.TipoOperacion ? `En ${atributos.TipoOperacion}` : 'Propiedades'}
                        </Link>
                        <span>/</span>
                        <span className="text-slate-700 truncate max-w-[200px]">{tituloFormateado}</span>
                    </div>
                </div>

                {/* Header de la Propiedad (con Valor y Contacto rediseñados de alta gama) */}
                <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    
                    {/* Columna Izquierda: Badges, Título, Ubicación, Atributos Rápidos */}
                    <div className="space-y-4 flex-grow">
                        <div className="flex flex-wrap gap-2.5 items-center">
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
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                atributos.Disponible ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}>
                                {atributos.Disponible ? 'Disponible' : 'Reservado'}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] tracking-tight leading-tight">
                            {tituloFormateado}
                        </h1>

                        <p className="text-slate-500 text-sm sm:text-base flex items-center gap-2 font-medium">
                            <FaMapMarkerAlt className="text-[#0F766E] shrink-0" />
                            <span>{atributos.Ubicacion || 'Ubicación no especificada'} {ciudad ? `— ${ciudad.Ciudad}` : ''}</span>
                        </p>

                        {/* Barra de Atributos Rápidos */}
                        <div className="pt-2 flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm font-semibold text-slate-700">
                            {atributos.SuperficieTotal > 0 && (
                                <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100">
                                    <FaRulerCombined className="text-[#0F766E]" />
                                    <span>{atributos.SuperficieTotal} m² Totales</span>
                                </div>
                            )}
                            {atributos.Dormitorios > 0 && (
                                <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100">
                                    <FaBed className="text-[#0F766E]" />
                                    <span>{atributos.Dormitorios} {atributos.Dormitorios === 1 ? 'Dormitorio' : 'Dormitorios'}</span>
                                </div>
                            )}
                            {atributos.Banos > 0 && (
                                <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100">
                                    <FaBath className="text-[#0F766E]" />
                                    <span>{atributos.Banos} {atributos.Banos === 1 ? 'Baño' : 'Baños'}</span>
                                </div>
                            )}
                            {atributos.Ambientes > 0 && (
                                <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100">
                                    <FaHome className="text-[#0F766E]" />
                                    <span>{atributos.Ambientes} Amb.</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Columna Derecha: Tarjeta Visual de Precio y Contacto */}
                    <div className="bg-gradient-to-br from-slate-50/90 via-slate-50 to-teal-50/40 p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-md flex flex-col items-start lg:items-end justify-between gap-5 w-full lg:w-auto shrink-0 min-w-[300px]">
                        {/* Encabezado del precio */}
                        <div className="space-y-1.5 w-full lg:text-right">
                            <div className="flex items-center justify-between lg:justify-end gap-2">
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#0F766E] bg-[#0F766E]/10 px-3 py-1 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] animate-pulse"></span>
                                    {tienePrecio ? `Valor en ${atributos.TipoOperacion || 'Venta'}` : 'Cotización'}
                                </span>
                            </div>

                            <div className="pt-1">
                                {tienePrecio ? (
                                    <div className="flex items-baseline lg:justify-end gap-1.5">
                                        <span className="text-xl sm:text-2xl font-black text-[#0F766E]">
                                            {monedaSimbolo}
                                        </span>
                                        <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                                            {Math.round(Number(atributos.Valor)).toLocaleString('es-AR')}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                                        Precio a consultar
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex items-center gap-2.5 w-full">
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-grow inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/35 btn-press transition-all cursor-pointer whitespace-nowrap"
                            >
                                <FaWhatsapp className="text-xl shrink-0" />
                                <span>Consultar por WhatsApp</span>
                            </a>

                            <button
                                type="button"
                                onClick={handleCompartir}
                                title="Compartir propiedad"
                                aria-label="Compartir propiedad"
                                className="p-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-all btn-press cursor-pointer border border-slate-200 shadow-sm shrink-0"
                            >
                                {copiado ? <FaCheck className="text-emerald-600 text-lg" /> : <FaShareAlt className="text-slate-600 text-lg" />}
                            </button>
                        </div>

                        {/* Micro-aviso de confianza */}
                        <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5 self-center lg:self-end">
                            <FaCheckCircle className="text-emerald-500 text-xs shrink-0" />
                            <span>Respuesta y asesoramiento profesional</span>
                        </p>
                    </div>

                </div>

                {/* Secciones de la Propiedad (Galería, Ficha Técnica, Descripción, Servicios, Ubicación) */}
                <div className="space-y-8">
                    
                    {/* Galería Inmersiva de Fotos */}
                    <div id="seccion-fotos">
                        <GaleriaInmueble imagenes={imagenes} titulo={tituloFormateado} />
                    </div>

                    {/* Bloque de 3 Columnas en Computadora: Ficha Técnica, Descripción y Servicios */}
                    <div className={`grid grid-cols-1 ${servicios.length > 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8 items-stretch`}>
                        
                        {/* Columna 1: Ficha Técnica */}
                        <div id="seccion-caracteristicas" className="flex flex-col h-full">
                            <FichaTecnica inmueble={inmueble} />
                        </div>

                        {/* Columna 2: Descripción General */}
                        <div id="seccion-descripcion" className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 space-y-4 flex flex-col h-full">
                            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                                <div className="p-2 bg-[#0F766E]/10 rounded-xl text-[#0F766E]">
                                    <FaInfoCircle className="text-xl" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Descripción General</h2>
                            </div>

                            <p className="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line overflow-y-auto max-h-[460px] scrollbar-thin pr-1">
                                {atributos.Descripcion || atributos.Descipcion || 'Sin descripción detallada.'}
                            </p>
                        </div>

                        {/* Columna 3: Servicios Incluidos */}
                        {servicios.length > 0 && (
                            <div id="seccion-servicios" className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 space-y-4 flex flex-col h-full">
                                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                                    <div className="p-2 bg-[#0F766E]/10 rounded-xl text-[#0F766E]">
                                        <FaCheckDouble className="text-xl" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800">Servicios Incluidos</h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 overflow-y-auto max-h-[460px] scrollbar-thin pr-1 text-sm">
                                    {servicios.map(servicio => (
                                        <div key={servicio.id} className="flex items-center gap-2.5 p-3 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-100 text-slate-700 font-semibold transition-colors">
                                            {obtenerIconoServicio(servicio.Nombre)}
                                            <span className="truncate">{servicio.Nombre}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Mapa de Ubicación */}
                    {atributos.latitud != null && atributos.longitud != null && (
                        <div id="seccion-ubicacion" className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 space-y-4">
                            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                                <div className="p-2 bg-[#0F766E]/10 rounded-xl text-[#0F766E]">
                                    <FaMapMarkerAlt className="text-xl" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Ubicación Geográfica</h2>
                            </div>

                            <MapaPropiedad
                                lat={atributos.latitud}
                                lng={atributos.longitud}
                                titulo={tituloFormateado}
                            />
                        </div>
                    )}

                </div>

                {/* Propiedades Relacionadas / Sugerencias */}
                <PropiedadesSimilares propiedadActual={inmueble} todasLasPropiedades={allInmuebles} />

            </div>
        </div>
    );
}

export default DetallePropiedad;
