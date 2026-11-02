import { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaWhatsapp, FaShareAlt, FaCheck, FaPhoneAlt, FaCalendarCheck } from "react-icons/fa";
import { formatearPrecio } from "../utils/formatearPrecio";
import { generarLinkWhatsApp, obtenerTelefonoOperacion } from "../utils/funContacto";
import { useToast } from "../context/ToastContext";

function TarjetaPrecioContacto({ inmueble, layout = 'block', onConsultarSimilares }) {
    const [copiado, setCopiado] = useState(false);
    const { mostrarToast } = useToast();

    if (!inmueble) return null;

    const { Disponible, Valor, Moneda, TipoOperacion, Ubicacion, Titulo } = inmueble;

    const monedaSimbolo = Moneda === 'Peso' ? '$' : 'U$S';
    const esAlquiler = TipoOperacion?.toLowerCase().includes('alquiler');
    const whatsappLinkConsulta = generarLinkWhatsApp(Ubicacion, TipoOperacion, Titulo, 'consulta');
    const whatsappLinkVisita = generarLinkWhatsApp(Ubicacion, TipoOperacion, Titulo, 'visita');
    const whatsappLinkSimilares = generarLinkWhatsApp(Ubicacion, TipoOperacion, Titulo, 'similares');
    const telefono = obtenerTelefonoOperacion(TipoOperacion);
    const tienePrecio = Valor != null && Valor > 0 && Valor !== '';
    const textoPrecio = formatearPrecio(Valor, monedaSimbolo);
    const textoPrecioConMes = esAlquiler && tienePrecio ? `${textoPrecio} / mes` : textoPrecio;
    const disponible = Disponible !== false;

    const handleCompartir = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: Titulo || 'Propiedad en Inmobiliaria Cristina Eckerdt',
                    text: `Mirá esta propiedad en ${TipoOperacion || 'inmobiliaria'}: ${Titulo}`,
                    url: window.location.href,
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Error al compartir:', err);
                }
            }
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopiado(true);
            mostrarToast('¡Enlace copiado al portapapeles!', 'success');
            setTimeout(() => setCopiado(false), 2500);
        }
    };

    if (layout === 'aside') {
        return (
            <aside className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                        {disponible ? `Valor en ${TipoOperacion || 'Venta / Alquiler'}` : 'Propiedad no disponible'}
                    </span>
                    <p className="text-4xl font-extrabold tracking-tight text-[#1E293B]">
                        {disponible ? textoPrecioConMes : 'Consultar valor'}
                    </p>
                    {esAlquiler && disponible && tienePrecio && (
                        <p className="text-xs font-semibold text-[#475569]">Valor mensual</p>
                    )}
                </div>

                <div className="mt-6 space-y-3">
                    {disponible ? (
                        <>
                            <a
                                href={whatsappLinkConsulta}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#15803D] py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-700/15 transition-colors hover:bg-[#166534] btn-press cursor-pointer"
                            >
                                <FaWhatsapp className="text-xl" />
                                <span>Consultar por WhatsApp</span>
                            </a>
                            <a
                                href={whatsappLinkVisita}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white py-3.5 text-sm font-bold text-[#1E293B] transition-colors hover:bg-slate-50 btn-press cursor-pointer"
                            >
                                <FaCalendarCheck className="text-lg text-[#0F766E]" />
                                <span>Coordinar una visita</span>
                            </a>
                        </>
                    ) : (
                        <a
                            href={onConsultarSimilares ? onConsultarSimilares : whatsappLinkSimilares}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#15803D] py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-700/15 transition-colors hover:bg-[#166534] btn-press cursor-pointer"
                        >
                            <FaWhatsapp className="text-xl" />
                            <span>Consultar por propiedades similares</span>
                        </a>
                    )}

                    <a
                        href={`tel:${telefono.tel}`}
                        className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 py-3.5 text-sm font-bold text-[#1E293B] transition-colors hover:bg-white btn-press cursor-pointer"
                    >
                        <FaPhoneAlt className="text-base text-[#0F766E]" />
                        <span>Llamar: {telefono.display}</span>
                    </a>

                    <button
                        type="button"
                        onClick={handleCompartir}
                        className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white py-3 text-sm font-semibold text-[#1E293B] transition-colors hover:bg-slate-50 btn-press cursor-pointer"
                    >
                        {copiado ? (
                            <>
                                <FaCheck className="text-base text-emerald-600" />
                                <span>Enlace copiado</span>
                            </>
                        ) : (
                            <>
                                <FaShareAlt className="text-base text-[#475569]" />
                                <span>Compartir propiedad</span>
                            </>
                        )}
                    </button>
                </div>
            </aside>
        );
    }

    return (
        <div className="space-y-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl sm:p-8">
            <div>
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                        {disponible ? `Valor en ${TipoOperacion || 'Venta / Alquiler'}` : 'Propiedad no disponible'}
                    </span>
                    <span className="rounded-full bg-[#0F766E]/10 px-2.5 py-1 text-xs font-semibold text-[#0F766E]">
                        Asesoramiento Profesional
                    </span>
                </div>

                <p className="mt-2 text-3xl font-extrabold tracking-tight text-[#1E293B] sm:text-4xl">
                    {disponible ? textoPrecioConMes : 'Precio a consultar'}
                </p>
                {esAlquiler && disponible && tienePrecio && (
                    <p className="mt-1 text-xs font-semibold text-[#475569]">Valor mensual</p>
                )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-semibold text-[#475569]">Estado de la propiedad</span>
                {disponible ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm">
                        <FaCheckCircle className="text-emerald-500" /> Disponible
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 shadow-sm">
                        <FaTimesCircle className="text-rose-500" /> No disponible
                    </span>
                )}
            </div>

            <div className="space-y-3 pt-2">
                {disponible ? (
                    <>
                        <a
                            href={whatsappLinkConsulta}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-4 px-6 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:from-emerald-500 hover:to-teal-500 hover:shadow-xl btn-press"
                        >
                            <FaWhatsapp className="text-xl" />
                            <span>Consultar por WhatsApp</span>
                        </a>
                        <a
                            href={whatsappLinkVisita}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-3.5 px-5 text-sm font-bold text-[#1E293B] transition-all duration-200 hover:bg-slate-50 btn-press"
                        >
                            <FaCalendarCheck className="text-lg text-[#0F766E]" />
                            <span>Coordinar una visita</span>
                        </a>
                    </>
                ) : (
                    <a
                        href={onConsultarSimilares ? onConsultarSimilares : whatsappLinkSimilares}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-4 px-6 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:from-emerald-500 hover:to-teal-500 hover:shadow-xl btn-press"
                    >
                        <FaWhatsapp className="text-xl" />
                        <span>Consultar por propiedades similares</span>
                    </a>
                )}

                <button
                    type="button"
                    onClick={handleCompartir}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 py-3.5 px-5 text-xs font-semibold text-[#1E293B] transition-all duration-200 hover:bg-slate-100 btn-press cursor-pointer"
                >
                    {copiado ? (
                        <>
                            <FaCheck className="text-sm text-emerald-600 animate-badge-pop" />
                            <span className="font-bold text-emerald-700">¡Enlace copiado al portapapeles!</span>
                        </>
                    ) : (
                        <>
                            <FaShareAlt className="text-xs text-[#475569]" />
                            <span>Compartir esta propiedad</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default TarjetaPrecioContacto;
