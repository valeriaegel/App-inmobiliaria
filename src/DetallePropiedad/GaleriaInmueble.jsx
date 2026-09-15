import { useState, useEffect, useCallback, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaExpand, FaTimes, FaHome } from 'react-icons/fa';

function GaleriaInmueble({ imagenes = [], titulo = 'Propiedad' }) {
    const [indexActivo, setIndexActivo] = useState(0);
    const [modalAbierto, setModalAbierto] = useState(false);

    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const minSwipeDistance = 45;

    const total = imagenes.length;

    const anterior = useCallback(() => {
        if (total <= 1) return;
        setIndexActivo((prev) => (prev === 0 ? total - 1 : prev - 1));
    }, [total]);

    const siguiente = useCallback(() => {
        if (total <= 1) return;
        setIndexActivo((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, [total]);

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
            // Deslizó hacia la izquierda -> Siguiente foto
            siguiente();
        } else if (distance < -minSwipeDistance) {
            // Deslizó hacia la derecha -> Foto anterior
            anterior();
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    // Referencias para auto-scrollear la miniatura activa en desktop y mobile
    const desktopThumbRefs = useRef({});
    const mobileThumbRefs = useRef({});

    useEffect(() => {
        if (desktopThumbRefs.current[indexActivo]) {
            desktopThumbRefs.current[indexActivo].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
        if (mobileThumbRefs.current[indexActivo]) {
            mobileThumbRefs.current[indexActivo].scrollIntoView({
                behavior: 'smooth',
                inline: 'nearest',
                block: 'nearest'
            });
        }
    }, [indexActivo]);

    // Soporte para navegación con teclado (flechas y escape)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (modalAbierto) {
                if (e.key === 'Escape') setModalAbierto(false);
                if (e.key === 'ArrowLeft') anterior();
                if (e.key === 'ArrowRight') siguiente();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [modalAbierto, anterior, siguiente]);

    // Si no hay imágenes, mostrar contenedor de reserva limpio
    if (!imagenes || total === 0) {
        return (
            <div className="h-80 sm:h-96 bg-slate-100 rounded-3xl flex flex-col items-center justify-center text-slate-400 gap-3 border border-slate-200">
                <FaHome className="text-5xl opacity-40" />
                <p className="font-semibold text-sm">No hay imágenes disponibles para esta propiedad.</p>
            </div>
        );
    }

    const imagenActual = imagenes[indexActivo];
    const urlActual = imagenActual?.formats?.large?.url || imagenActual?.url;

    return (
        <div className="space-y-3.5 select-none">
            {/* Contenedor Principal: Visor + Miniaturas laterales en computadoras */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch">
                
                {/* 1. VISOR PRINCIPAL (Sin fondo oscuro, la imagen llena el banner con elegancia) */}
                <div
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="relative flex-1 h-[360px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200/80 group"
                >
                    {/* Imagen Principal ajustada sin bandas negras */}
                    <img
                        src={urlActual}
                        alt={`${titulo} - Foto ${indexActivo + 1}`}
                        onClick={() => setModalAbierto(true)}
                        className="w-full h-full object-cover cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                    />

                    {/* Flecha Izquierda */}
                    {total > 1 && (
                        <button
                            type="button"
                            onClick={anterior}
                            aria-label="Foto anterior"
                            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg border border-white/20 hover:scale-110 btn-press cursor-pointer z-10"
                        >
                            <FaChevronLeft className="text-sm" />
                        </button>
                    )}

                    {/* Flecha Derecha */}
                    {total > 1 && (
                        <button
                            type="button"
                            onClick={siguiente}
                            aria-label="Foto siguiente"
                            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-lg border border-white/20 hover:scale-110 btn-press cursor-pointer z-10"
                        >
                            <FaChevronRight className="text-sm" />
                        </button>
                    )}

                    {/* Badge Inferior: Conteo + Botón Pantalla Completa */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                        <span className="bg-black/60 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-semibold border border-white/20 shadow-md">
                            Foto {indexActivo + 1} de {total}
                        </span>

                        <button
                            type="button"
                            onClick={() => setModalAbierto(true)}
                            title="Ver en pantalla completa"
                            aria-label="Ver en pantalla completa"
                            className="bg-black/60 hover:bg-black/90 text-white p-2 rounded-full backdrop-blur-md border border-white/20 shadow-md transition-all hover:scale-105 btn-press cursor-pointer"
                        >
                            <FaExpand className="text-xs" />
                        </button>
                    </div>
                </div>

                {/* 2. TIRA DE MINIATURAS VERTICAL (Solo en Computadoras / Pantallas grandes) */}
                {total > 1 && (
                    <div className="hidden lg:flex flex-col gap-3 w-60 xl:w-72 h-[500px] overflow-y-auto pr-1.5 scrollbar-thin shrink-0 select-none">
                        {imagenes.map((img, index) => {
                            const esActiva = index === indexActivo;
                            const thumbUrl = img.formats?.small?.url || img.formats?.thumbnail?.url || img.url;

                            return (
                                <button
                                    key={img.id || index}
                                    ref={(el) => (desktopThumbRefs.current[index] = el)}
                                    type="button"
                                    onClick={() => setIndexActivo(index)}
                                    aria-label={`Ir a foto ${index + 1}`}
                                    className={`relative h-28 w-full rounded-2xl overflow-hidden shrink-0 transition-all duration-200 cursor-pointer btn-press ${
                                        esActiva
                                            ? 'ring-3 ring-[#0F766E] ring-offset-2 ring-offset-white scale-[1.02] shadow-lg opacity-100'
                                            : 'opacity-70 hover:opacity-100 hover:scale-[1.01] border border-slate-200/80 shadow-sm'
                                    }`}
                                >
                                    <img
                                        src={thumbUrl}
                                        alt={`Miniatura ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <span className="absolute bottom-1.5 left-1.5 bg-black/70 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-0.5 rounded-md leading-none">
                                        Foto {index + 1}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}

            </div>

            {/* 3. TIRA DE MINIATURAS HORIZONTAL (Solo en Móviles y Tablets menores a lg) */}
            {total > 1 && (
                <div className="flex lg:hidden items-center gap-2.5 overflow-x-auto py-2 px-1 scrollbar-thin">
                    {imagenes.map((img, index) => {
                        const esActiva = index === indexActivo;
                        const thumbUrl = img.formats?.small?.url || img.formats?.thumbnail?.url || img.url;

                        return (
                            <button
                                key={img.id || index}
                                ref={(el) => (mobileThumbRefs.current[index] = el)}
                                type="button"
                                onClick={() => setIndexActivo(index)}
                                aria-label={`Ir a foto ${index + 1}`}
                                className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded-2xl overflow-hidden shrink-0 transition-all duration-200 cursor-pointer btn-press ${
                                    esActiva
                                        ? 'ring-2 ring-[#0F766E] ring-offset-2 ring-offset-white scale-105 shadow-md opacity-100'
                                        : 'opacity-60 hover:opacity-100 border border-slate-200'
                                }`}
                            >
                                <img
                                    src={thumbUrl}
                                    alt={`Miniatura ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none">
                                    {index + 1}
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* 3. MODAL DE PANTALLA COMPLETA (LIGHTBOX) */}
            {modalAbierto && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
                >
                    {/* Barra Superior del Modal */}
                    <div className="flex items-center justify-between text-white border-b border-white/10 pb-3">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full text-emerald-400">
                                Foto {indexActivo + 1} de {total}
                            </span>
                            <span className="text-xs sm:text-sm font-semibold truncate max-w-xs sm:max-w-md text-slate-300">
                                {titulo}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() => setModalAbierto(false)}
                            aria-label="Cerrar vista completa"
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors btn-press cursor-pointer"
                        >
                            <FaTimes className="text-base" />
                        </button>
                    </div>

                    {/* Área Central: Foto Ampliada con soporte táctil */}
                    <div
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        className="relative flex-grow flex items-center justify-center my-3 overflow-hidden"
                    >
                        <img
                            src={urlActual}
                            alt={`${titulo} - Foto ${indexActivo + 1}`}
                            className="max-h-[78vh] max-w-[95vw] object-contain rounded-2xl shadow-2xl transition-all"
                        />

                        {/* Flechas en pantalla completa */}
                        {total > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={anterior}
                                    className="absolute left-2 sm:left-6 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 hover:scale-110 transition-all btn-press cursor-pointer"
                                >
                                    <FaChevronLeft className="text-base" />
                                </button>

                                <button
                                    type="button"
                                    onClick={siguiente}
                                    className="absolute right-2 sm:right-6 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 hover:scale-110 transition-all btn-press cursor-pointer"
                                >
                                    <FaChevronRight className="text-base" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Miniaturas en pantalla completa */}
                    {total > 1 && (
                        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
                            {imagenes.map((img, index) => {
                                const esActiva = index === indexActivo;
                                const thumbUrl = img.formats?.thumbnail?.url || img.formats?.small?.url || img.url;

                                return (
                                    <button
                                        key={img.id || index}
                                        type="button"
                                        onClick={() => setIndexActivo(index)}
                                        className={`w-14 h-12 sm:w-16 sm:h-14 rounded-xl overflow-hidden shrink-0 transition-all cursor-pointer ${
                                            esActiva
                                                ? 'ring-2 ring-emerald-400 scale-105 opacity-100'
                                                : 'opacity-40 hover:opacity-80'
                                        }`}
                                    >
                                        <img
                                            src={thumbUrl}
                                            alt={`Miniatura ${index + 1}`}
                                            className="w-full h-full object-cover"
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
