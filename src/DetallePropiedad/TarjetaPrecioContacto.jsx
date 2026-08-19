import { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaWhatsapp, FaShareAlt, FaCheck, FaUserTie } from "react-icons/fa";
import { formatearPrecio } from "../utils/formatearPrecio";
import { generarLinkWhatsApp } from "../utils/funContacto";

function TarjetaPrecioContacto({ inmueble }) {
    const [copiado, setCopiado] = useState(false);

    if (!inmueble) return null;

    const { Disponible, Valor, Moneda, TipoOperacion, Ubicacion, Titulo } = inmueble;
    const monedaSimbolo = Moneda === 'Peso' ? '$' : 'U$S';
    const whatsappLink = generarLinkWhatsApp(Ubicacion, TipoOperacion, Titulo);
    const tienePrecio = Valor != null && Valor > 0 && Valor !== '';
    const textoPrecio = formatearPrecio(Valor, monedaSimbolo);

    const handleCopiarEnlace = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 2500);
        }
    };

    return (
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6 transform hover:shadow-2xl transition-all duration-300">
            {/* Precio */}
            <div>
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {tienePrecio ? `Valor en ${TipoOperacion || 'Venta / Alquiler'}` : 'Precio a consultar'}
                    </span>
                    <span className="text-[11px] font-semibold bg-[#0F766E]/10 text-[#0F766E] px-2.5 py-0.5 rounded-full">
                        Asesoramiento Profesional
                    </span>
                </div>

                <p className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] mt-2 tracking-tight">
                    {textoPrecio}
                </p>
            </div>

            {/* Estado del inmueble */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Estado de la propiedad</span>
                {Disponible ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
                        <FaCheckCircle className="text-emerald-500" /> Disponible
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200 shadow-sm">
                        <FaTimesCircle className="text-rose-500" /> Reservado
                    </span>
                )}
            </div>

            {/* Botones de Acción */}
            <div className="space-y-3 pt-2">
                <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-sm transform hover:-translate-y-0.5"
                >
                    <FaWhatsapp className="text-xl" />
                    <span>Consultar por WhatsApp</span>
                </a>

                <button
                    onClick={handleCopiarEnlace}
                    className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-3 px-5 rounded-2xl transition-all duration-200 border border-slate-200 flex items-center justify-center gap-2 text-xs cursor-pointer"
                >
                    {copiado ? (
                        <>
                            <FaCheck className="text-emerald-600 text-sm" />
                            <span className="text-emerald-700 font-bold">¡Enlace copiado al portapapeles!</span>
                        </>
                    ) : (
                        <>
                            <FaShareAlt className="text-slate-500 text-xs" />
                            <span>Compartir esta propiedad</span>
                        </>
                    )}
                </button>
            </div>

        </div>
    );
}

export default TarjetaPrecioContacto;
