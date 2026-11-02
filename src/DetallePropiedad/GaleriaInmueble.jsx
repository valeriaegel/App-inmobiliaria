import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    FaChevronLeft,
    FaChevronRight,
    FaExpand,
    FaTimes,
    FaHome,
    FaShareAlt,
    FaCheck,
} from 'react-icons/fa';

const obtenerUrl = (imagen, tamano = 'large') =>
    imagen?.formats?.[tamano]?.url || imagen?.formats?.large?.url || imagen?.url;

function GaleriaInmueble({
    imagenes = [],
    titulo = 'Propiedad',
    operacion = '',
    volverUrl = '/propiedades/Venta',
    onCompartir,
    compartido = false,
}) {
    const [indexActivo, setIndexActivo] = useState(0);
    const [modalAbierto, setModalAbierto] = useState(false);

    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const minSwipeDistance = 45;

    const total = imagenes.length;
    const imagenActual = imagenes[indexActivo];
    const urlActual = obtenerUrl(imagenActual);

    const anterior = useCallback(() => {
        if (total <= 1) return;
        setIndexActivo((prev) => (prev === 0 ? total - 1 : prev - 1));
    }, [total]);

    const siguiente = useCallback(() => {
        if (total <= 1) return;
        setIndexActivo((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, [total]);

    const abrirModal = (index = indexActivo) => {
        setIndexActivo(index);
        setModalAbierto(true);
    };

    // Gestos táctiles de deslizamiento (swipe)
    const handleTouchStart = (e) => {
        touchEndX.current = null;
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;
        const distance = touchStartX.current - touchEndX.current;
        if (distance > minSwipeDistance) {
            siguiente();
        } else if (distance < -minSwipeDistance) {
            anterior();
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    // Navegación con teclado dentro del lightbox
    useEffect(() => {
        if (!modalAbierto) return undefined;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setModalAbierto(false);
            if (e.key === 'ArrowLeft') anterior();
            if (e.key === 'ArrowRight') siguiente();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [modalAbierto, anterior, siguiente]);

    const botonCompartir = (
        <button
            type="button"
            onClick={onCompartir}
            title="Compartir propiedad"
            aria-label={compartido ? 'Enlace copiado' : 'Compartir propiedad'}
            className="absolute top-3 right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white text-[#1E293B] shadow-lg transition-colors hover:bg-slate-50 btn-press cursor-pointer"
        >
            {compartido ? (
                <FaCheck className="text-base text-emerald-600" />
            ) : (
                <FaShareAlt className="text-sm" />
            )}
        </button>
    );

    if (total === 0) {
        return (
            <div className="-mx-4 md:-mx-8 lg:mx-0">
                <div className="relative flex aspect-[4/3] max-h-[60vh] w-full flex-col items-center justify-center gap-3 overflow-hidden bg-slate-100 text-[#475569] lg:hidden">
                    <FaHome className="text-5xl opacity-30" />
                    <p className="px-8 text-center text-sm font-semibold">
                        No hay imágenes disponibles para esta propiedad.
                    </p>
                    <Link
                        to={volverUrl}
                        aria-label="Volver a propiedades"
                        className="absolute top-3 left-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white text-[#1E293B] shadow-lg transition-colors hover:bg-slate-50 btn-press"
                    >
                        <FaChevronLeft className="text-sm" />
                    </Link>
                    {onCompartir && botonCompartir}
                    {operacion && (
                        <span className="absolute bottom-3 left-3 z-10 rounded-full bg-[#1E293B]/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                            {operacion}
                        </span>
                    )}
                </div>

                <div className="relative hidden aspect-[16/9] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl bg-slate-100 text-[#475569] lg:flex">
                    <FaHome className="text-5xl opacity-30" />
                    <p className="text-sm font-semibold">No hay imágenes disponibles para esta propiedad.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="select-none">
            {/* Celular y tablet: galería a todo el ancho, 4:3 con altura máxima */}
            <div className="-mx-4 md:-mx-8 lg:hidden">
                <div
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="relative aspect-[4/3] max-h-[60vh] w-full overflow-hidden bg-slate-100"
                >
                    <img
                        src={urlActual}
                        alt={`${titulo} - Foto ${indexActivo + 1}`}
                        onClick={() => abrirModal()}
                        className="h-full w-full cursor-pointer object-cover"
                    />

                    <Link
                        to={volverUrl}
                        aria-label="Volver a propiedades"
                        className="absolute top-3 left-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white text-[#1E293B] shadow-lg transition-colors hover:bg-slate-50 btn-press"
                    >
                        <FaChevronLeft className="text-sm" />
                    </Link>

                    {onCompartir && botonCompartir}

                    {total > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={anterior}
                                aria-label="Foto anterior"
                                className="absolute top-1/2 left-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-white/95 text-[#1E293B] shadow-lg backdrop-blur-sm transition-colors hover:bg-white btn-press cursor-pointer"
                            >
                                <FaChevronLeft className="text-sm" />
                            </button>
                            <button
                                type="button"
                                onClick={siguiente}
                                aria-label="Foto siguiente"
                                className="absolute top-1/2 right-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-white/95 text-[#1E293B] shadow-lg backdrop-blur-sm transition-colors hover:bg-white btn-press cursor-pointer"
                            >
                                <FaChevronRight className="text-sm" />
                            </button>
                        </>
                    )}

                    {operacion && (
                        <span className="absolute bottom-3 left-3 z-10 rounded-full bg-[#1E293B]/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                            {operacion}
                        </span>
                    )}

                    <span className="absolute right-3 bottom-3 z-10 rounded-full bg-[#1E293B]/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                        {indexActivo + 1} / {total}
                    </span>
                </div>
            </div>

            {/* Escritorio: mosaico con foto principal y cuatro miniaturas */}
            <div className="relative hidden lg:block">
                <div
                    className={`grid gap-3 overflow-hidden rounded-3xl bg-slate-100 ${
                        total > 1 ? 'grid-cols-[1.9fr_1fr]' : 'grid-cols-1'
                    }`}
                >
                    <button
                        type="button"
                        onClick={() => abrirModal(0)}
                        aria-label="Abrir galería de fotos"
                        className="group relative aspect-[4/3] max-h-[560px] cursor-pointer overflow-hidden"
                    >
                        <img
                            src={obtenerUrl(imagenes[0])}
                            alt={`${titulo} - Foto 1`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/25 via-transparent to-transparent" />
                    </button>

                    {total > 1 && (
                        <div className="grid grid-cols-2 grid-rows-2 gap-3">
                            {Array.from({ length: 4 }).map((_, posicion) => {
                                const index = posicion + 1;
                                const imagen = imagenes[index];

                                if (!imagen) {
                                    return (
                                        <div
                                            key={`placeholder-${posicion}`}
                                            className="flex aspect-square items-center justify-center bg-slate-100/80 text-slate-300"
                                        >
                                            <FaHome className="text-2xl opacity-40" />
                                        </div>
                                    );
                                }

                                return (
                                    <button
                                        key={imagen.id || index}
                                        type="button"
                                        onClick={() => abrirModal(index)}
                                        aria-label={`Ver foto ${index + 1}`}
                                        className="group relative aspect-square cursor-pointer overflow-hidden"
                                    >
                                        <img
                                            src={obtenerUrl(imagen, 'small')}
                                            alt={`${titulo} - Foto ${index + 1}`}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <span className="absolute inset-0 bg-[#0F172A]/0 transition-colors group-hover:bg-[#0F172A]/15" />
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => abrirModal(0)}
                    className="absolute right-4 bottom-4 z-10 inline-flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-xs font-bold text-[#1E293B] shadow-xl transition-colors hover:bg-slate-50 btn-press cursor-pointer"
                >
                    <FaExpand className="text-sm text-[#0F766E]" />
                    <span>Ver las {total} fotos</span>
                </button>
            </div>

            {/* Lightbox existente, accesible desde ambos layouts */}
            {modalAbierto && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Galería de fotos de ${titulo}`}
                    className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 p-4 backdrop-blur-2xl animate-in fade-in duration-200 sm:p-6"
                >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 text-white">
                        <div className="flex items-center gap-3">
                            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-wider text-emerald-400 uppercase">
                                Foto {indexActivo + 1} de {total}
                            </span>
                            <span className="max-w-xs truncate text-xs font-semibold text-slate-300 sm:max-w-md sm:text-sm">
                                {titulo}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() => setModalAbierto(false)}
                            aria-label="Cerrar vista completa"
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 btn-press cursor-pointer"
                        >
                            <FaTimes className="text-base" />
                        </button>
                    </div>

                    <div
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        className="relative my-3 flex flex-grow items-center justify-center overflow-hidden"
                    >
                        <img
                            src={urlActual}
                            alt={`${titulo} - Foto ${indexActivo + 1}`}
                            className="max-h-[78vh] max-w-[95vw] rounded-2xl object-contain shadow-2xl transition-all"
                        />

                        {total > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={anterior}
                                    aria-label="Foto anterior"
                                    className="absolute left-2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-all hover:scale-110 hover:bg-black/90 btn-press cursor-pointer sm:left-6"
                                >
                                    <FaChevronLeft className="text-base" />
                                </button>

                                <button
                                    type="button"
                                    onClick={siguiente}
                                    aria-label="Foto siguiente"
                                    className="absolute right-2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-all hover:scale-110 hover:bg-black/90 btn-press cursor-pointer sm:right-6"
                                >
                                    <FaChevronRight className="text-base" />
                                </button>
                            </>
                        )}
                    </div>

                    {total > 1 && (
                        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
                            {imagenes.map((img, index) => {
                                const esActiva = index === indexActivo;
                                const thumbUrl = obtenerUrl(img, 'thumbnail');

                                return (
                                    <button
                                        key={img.id || index}
                                        type="button"
                                        onClick={() => setIndexActivo(index)}
                                        aria-label={`Ir a foto ${index + 1}`}
                                        className={`h-12 w-14 shrink-0 overflow-hidden rounded-xl transition-all cursor-pointer sm:h-14 sm:w-16 ${
                                            esActiva
                                                ? 'scale-105 opacity-100 ring-2 ring-emerald-400'
                                                : 'opacity-40 hover:opacity-80'
                                        }`}
                                    >
                                        <img
                                            src={thumbUrl}
                                            alt={`Miniatura ${index + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default GaleriaInmueble;
