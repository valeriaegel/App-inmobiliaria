import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
    FaMapMarkerAlt,
    FaInfoCircle,
    FaCheckDouble,
    FaRulerCombined,
    FaBed,
    FaBath,
    FaHome,
    FaWhatsapp,
    FaPhoneAlt,
    FaTimesCircle,
} from 'react-icons/fa';
import { PropertyContext } from '../context/PropertyContext';
import { propertyService } from '../services/propertyService';
import { capitalizarTitulo } from '../utils/formatearTexto';
import { obtenerIconoServicio } from '../utils/serviciosIcons';
import { formatearPrecio } from '../utils/formatearPrecio';
import { generarLinkWhatsApp, obtenerTelefonoOperacion } from '../utils/funContacto';
import { useToast } from '../context/ToastContext';

// Componentes modulares internos
import GaleriaInmueble from './GaleriaInmueble';
import MapaPropiedad from './MapaPropiedad';
import PropiedadesSimilares from './PropiedadesSimilares';
import TarjetaPrecioContacto from './TarjetaPrecioContacto';

const datosRapidosDe = (inmueble) => {
    const datos = [
        {
            icono: <FaRulerCombined className="mb-1 text-base text-[#0F766E]" aria-hidden="true" />,
            valor: `${inmueble.SuperficieTotal} m²`,
            etiqueta: 'm² totales',
            etiquetaCorta: 'm² tot.',
            etiquetaMinima: 'tot.',
            visible: inmueble.SuperficieTotal > 0,
        },
        {
            icono: <FaRulerCombined className="mb-1 text-base text-[#0F766E]" aria-hidden="true" />,
            valor: `${inmueble.SuperficieConstruida} m²`,
            etiqueta: 'm² cubiertos',
            etiquetaCorta: 'm² cub.',
            etiquetaMinima: 'cub.',
            visible: inmueble.SuperficieConstruida > 0,
        },
        {
            icono: <FaBed className="mb-1 text-base text-[#0F766E]" aria-hidden="true" />,
            valor: inmueble.Dormitorios,
            etiqueta: inmueble.Dormitorios === 1 ? 'dormitorio' : 'dormitorios',
            etiquetaCorta: 'dorm.',
            visible: inmueble.Dormitorios > 0,
        },
        {
            icono: <FaBath className="mb-1 text-base text-[#0F766E]" aria-hidden="true" />,
            valor: inmueble.Banos,
            etiqueta: inmueble.Banos === 1 ? 'baño' : 'baños',
            visible: inmueble.Banos > 0,
        },
        {
            icono: <FaHome className="mb-1 text-base text-[#0F766E]" aria-hidden="true" />,
            valor: inmueble.Ambientes,
            etiqueta: inmueble.Ambientes === 1 ? 'ambiente' : 'ambientes',
            etiquetaCorta: 'amb.',
            visible: inmueble.Ambientes > 0,
        },
    ];

    return datos.filter((dato) => dato.visible);
};

function DatosRapidos({ inmueble }) {
    const datos = datosRapidosDe(inmueble);

    if (datos.length === 0) return null;

    // Una columna por casilla visible (4 o 5): siempre una sola fila, sin huecos ni casillas huérfanas.
    return (
        <div
            className="grid gap-2 sm:gap-2.5"
            style={{ gridTemplateColumns: `repeat(${datos.length}, minmax(0, 1fr))` }}
        >
            {datos.map(({ icono, valor, etiqueta, etiquetaCorta = etiqueta, etiquetaMinima = etiquetaCorta }) => (
                <div
                    key={etiqueta}
                    className="flex min-h-[76px] min-w-0 flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 px-1 py-3 text-center sm:px-1.5"
                >
                    {icono}
                    <span className="text-sm font-extrabold leading-tight text-[#1E293B]">{valor}</span>
                    {/* Rótulo según ancho: <360px mínimo, 360-639px corto, ≥640px completo */}
                    <span className="mt-0.5 w-full truncate text-xs font-medium text-[#475569] min-[360px]:hidden">{etiquetaMinima}</span>
                    <span className="mt-0.5 hidden w-full truncate text-xs font-medium text-[#475569] min-[360px]:block sm:hidden">{etiquetaCorta}</span>
                    <span className="mt-0.5 hidden w-full truncate text-xs font-medium text-[#475569] sm:block">{etiqueta}</span>
                </div>
            ))}
        </div>
    );
}

function DetallePropiedad() {
    const { documentId } = useParams();
    const location = useLocation();
    const [inmueble, setInmueble] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [copiado, setCopiado] = useState(false);
    const [descripcionExpandida, setDescripcionExpandida] = useState(false);

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
            <div className="min-h-screen bg-[#F0F2ED] py-8 md:py-12">
                <div className="container mx-auto max-w-7xl space-y-8 px-4 md:px-8">
                    <div className="h-9 w-44 skeleton-shimmer rounded-full"></div>
                    <div className="h-[320px] skeleton-shimmer rounded-3xl"></div>
                    <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 sm:p-8">
                        <div className="h-6 w-32 skeleton-shimmer rounded-full"></div>
                        <div className="h-8 w-2/3 skeleton-shimmer rounded-xl"></div>
                        <div className="h-4 w-1/3 skeleton-shimmer rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <div className="mx-auto max-w-md rounded-3xl border border-rose-200 bg-rose-50 p-8 font-bold text-rose-600">
                    {error}
                </div>
            </div>
        );
    }

    if (!inmueble) {
        return (
            <div className="container mx-auto px-4 py-24 text-center font-medium text-[#475569]">
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
    const volverUrl = location.state?.from || operacionUrl;
    const tituloFormateado = capitalizarTitulo(atributos.Titulo) || 'Inmueble sin título';

    const monedaSimbolo = atributos.Moneda === 'Peso' ? '$' : 'U$S';
    const tienePrecio = atributos.Valor != null && atributos.Valor > 0 && atributos.Valor !== '';
    const textoPrecio = tienePrecio ? formatearPrecio(atributos.Valor, monedaSimbolo) : 'Precio a consultar';
    const esAlquiler = atributos.TipoOperacion?.toLowerCase().includes('alquiler');
    const disponible = atributos.Disponible !== false;
    const estadoTexto = disponible ? 'Disponible' : 'No disponible';
    const lineaTipo = `${tipoInmueble || atributos.TipoOperacion || 'Propiedad'} · ${estadoTexto}`;

    const telefono = obtenerTelefonoOperacion(atributos.TipoOperacion);
    const whatsappLink = generarLinkWhatsApp(
        atributos.Ubicacion,
        atributos.TipoOperacion,
        tituloFormateado,
        disponible ? 'consulta' : 'similares'
    );
    const whatsappSimilaresLink = generarLinkWhatsApp(
        atributos.Ubicacion,
        atributos.TipoOperacion,
        tituloFormateado,
        'similares'
    );

    const descripcion = atributos.Descripcion || atributos.Descipcion || 'Sin descripción detallada.';
    const descripcionLarga = descripcion.length > 180;

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

    const encabezadoPropiedad = (
        <div className="space-y-4">
            <p className={`text-xs font-extrabold uppercase tracking-[0.16em] ${disponible ? 'text-[#0F766E]' : 'text-rose-600'}`}>
                {lineaTipo}
            </p>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#1E293B] sm:text-4xl lg:text-5xl">
                {tituloFormateado}
            </h1>

            <p className="flex items-start gap-2 text-sm font-medium leading-relaxed text-[#475569] sm:text-base">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-[#0F766E]" aria-hidden="true" />
                <span>
                    {atributos.Ubicacion || 'Ubicación no especificada'}
                    {ciudad ? ` — ${ciudad.Ciudad}` : ''}
                </span>
            </p>

            <DatosRapidos inmueble={atributos} />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F0F2ED] pb-28 animate-in fade-in duration-300 lg:pb-12">
            <div className="container mx-auto max-w-7xl px-4 md:px-8">
                {/* Breadcrumb de escritorio */}
                <nav
                    aria-label="Migas de pan"
                    className="hidden items-center gap-2 py-5 text-xs font-semibold text-[#475569] lg:flex"
                >
                    <Link to="/" className="transition-colors hover:text-[#0F766E]">Inicio</Link>
                    <span aria-hidden="true">/</span>
                    <Link to={operacionUrl} className="transition-colors hover:text-[#0F766E]">
                        {atributos.TipoOperacion ? `En ${atributos.TipoOperacion}` : 'Propiedades'}
                    </Link>
                    <span aria-hidden="true">/</span>
                    <span className="max-w-[320px] truncate text-[#1E293B]">{tituloFormateado}</span>
                </nav>

                {/* Galería: en celular es lo primero y va a todo el ancho */}
                <div id="seccion-fotos">
                    <GaleriaInmueble
                        imagenes={imagenes}
                        titulo={tituloFormateado}
                        operacion={atributos.TipoOperacion || ''}
                        volverUrl={volverUrl}
                        onCompartir={handleCompartir}
                        compartido={copiado}
                    />
                </div>

                {!disponible && (
                    <div className="mt-4 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3.5 shadow-sm">
                        <FaTimesCircle className="mt-0.5 shrink-0 text-lg text-rose-500" aria-hidden="true" />
                        <div>
                            <p className="text-sm font-bold text-rose-900">Esta propiedad no se encuentra disponible</p>
                            <p className="mt-0.5 text-sm text-[#475569]">Consultanos por opciones similares en venta o alquiler.</p>
                        </div>
                    </div>
                )}

                {/* Bloque blanco de presentación en celular */}
                <section className="-mx-4 bg-white px-5 py-6 md:-mx-8 md:px-8 lg:hidden">
                    {encabezadoPropiedad}

                    <div className="mt-5 border-t border-slate-100 pt-5">
                        <p className="text-3xl font-extrabold tracking-tight text-[#1E293B] sm:text-4xl">
                            {textoPrecio}
                            {esAlquiler && tienePrecio && (
                                <span className="ml-1 text-sm font-semibold text-[#475569]">/ mes</span>
                            )}
                        </p>
                    </div>
                </section>

                <div className="mt-6 grid grid-cols-1 gap-6 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
                    <div className="space-y-6">
                        {/* Título, ubicación y datos en escritorio */}
                        <section className="hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm lg:block lg:p-8">
                            {encabezadoPropiedad}
                        </section>

                        {/* Descripción */}
                        <section
                            id="seccion-descripcion"
                            className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 lg:p-8"
                        >
                            <div className="mb-4 flex items-center gap-2.5 border-b border-slate-100 pb-4">
                                <div className="rounded-xl bg-[#0F766E]/10 p-2 text-[#0F766E]">
                                    <FaInfoCircle className="text-xl" aria-hidden="true" />
                                </div>
                                <h2 className="text-xl font-bold text-[#1E293B]">Descripción</h2>
                            </div>

                            <p
                                id="texto-descripcion"
                                className={`whitespace-pre-line text-sm leading-relaxed text-[#475569] sm:text-base ${
                                    !descripcionExpandida ? 'line-clamp-3 lg:line-clamp-none' : ''
                                }`}
                            >
                                {descripcion}
                            </p>

                            {descripcionLarga && (
                                <button
                                    type="button"
                                    onClick={() => setDescripcionExpandida((valor) => !valor)}
                                    aria-expanded={descripcionExpandida}
                                    aria-controls="texto-descripcion"
                                    className="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-[#0F766E] transition-colors hover:text-[#0D9488] lg:hidden"
                                >
                                    {descripcionExpandida ? 'Leer menos' : 'Leer más'}
                                </button>
                            )}
                        </section>

                        {servicios.length > 0 && (
                            <section
                                id="seccion-servicios"
                                className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 lg:p-8"
                            >
                                <div className="mb-4 flex items-center gap-2.5 border-b border-slate-100 pb-4">
                                    <div className="rounded-xl bg-[#0F766E]/10 p-2 text-[#0F766E]">
                                        <FaCheckDouble className="text-xl" aria-hidden="true" />
                                    </div>
                                    <h2 className="text-xl font-bold text-[#1E293B]">Servicios</h2>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {servicios.map(servicio => (
                                        <span
                                            key={servicio.id}
                                            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#0F766E]/15 bg-[#0F766E]/5 px-4 text-sm font-semibold text-[#1E293B]"
                                        >
                                            {obtenerIconoServicio(servicio.Nombre)}
                                            <span>{servicio.Nombre}</span>
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {atributos.latitud != null && atributos.longitud != null && (
                            <section
                                id="seccion-ubicacion"
                                className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 lg:p-8"
                            >
                                <div className="mb-4 flex items-center gap-2.5 border-b border-slate-100 pb-4">
                                    <div className="rounded-xl bg-[#0F766E]/10 p-2 text-[#0F766E]">
                                        <FaMapMarkerAlt className="text-xl" aria-hidden="true" />
                                    </div>
                                    <h2 className="text-xl font-bold text-[#1E293B]">Ubicación</h2>
                                </div>

                                <MapaPropiedad
                                    lat={atributos.latitud}
                                    lng={atributos.longitud}
                                    titulo={tituloFormateado}
                                />
                            </section>
                        )}
                    </div>

                    {/* Aside de escritorio */}
                    <div className="hidden lg:block">
                        <TarjetaPrecioContacto
                            inmueble={inmueble}
                            layout="aside"
                            onConsultarSimilares={whatsappSimilaresLink}
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <PropiedadesSimilares
                        propiedadActual={inmueble}
                        todasLasPropiedades={allInmuebles}
                    />
                </div>
            </div>

            {/* Barra fija de contacto en celular y tablet */}
            <div
                className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 shadow-[0_-8px_30px_rgba(15,23,42,0.10)] backdrop-blur-md lg:hidden"
                style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
            >
                <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2.5">
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold uppercase tracking-wide text-[#475569]">
                            {disponible ? (atributos.TipoOperacion || 'Propiedad') : 'No disponible'}
                        </p>
                        <p className="truncate text-base font-extrabold text-[#1E293B]">
                            {textoPrecio}
                            {esAlquiler && tienePrecio && (
                                <span className="ml-1 text-xs font-semibold text-[#475569]">/ mes</span>
                            )}
                        </p>
                    </div>

                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={disponible ? 'Consultar por WhatsApp' : 'Consultar por propiedades similares'}
                        className="inline-flex h-[50px] min-w-0 flex-[1.35] items-center justify-center gap-2 rounded-xl bg-[#15803D] px-3 text-sm font-extrabold text-white shadow-md transition-colors hover:bg-[#166534] btn-press"
                    >
                        <FaWhatsapp className="shrink-0 text-lg" aria-hidden="true" />
                        <span className="truncate">Consultar</span>
                    </a>

                    <a
                        href={`tel:${telefono.tel}`}
                        aria-label={`Llamar al ${telefono.display}`}
                        className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#1E293B] shadow-sm transition-colors hover:bg-slate-50 btn-press"
                    >
                        <FaPhoneAlt aria-hidden="true" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default DetallePropiedad;
