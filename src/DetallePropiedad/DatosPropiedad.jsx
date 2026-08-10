import FunContacto from "./FunContacto";
import { FaCheckCircle, FaTimesCircle, FaWhatsapp, FaShieldAlt } from "react-icons/fa";
import { formatearPrecio } from "../utils/formatearPrecio";

const DatosPropiedad = ({disponible, valor, moneda, tipoOperacion, Ubicacion}) => {
  const whatsappLink = FunContacto(Ubicacion);
  const tienePrecio = valor != null && valor > 0 && valor !== '';
  const textoPrecio = formatearPrecio(valor, moneda);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {tienePrecio ? `Valor en ${tipoOperacion || 'Venta / Alquiler'}` : 'Precio a consultar'}
        </span>
        <p className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] mt-1 tracking-tight">
          {textoPrecio}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">Estado del inmueble</span>
        {disponible ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
            <FaCheckCircle /> Disponible
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200">
            <FaTimesCircle /> Reservado
          </span>
        )}
      </div>

      <a 
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-sm"
      >
        <FaWhatsapp className="text-xl" />
        <span>Consultar por esta propiedad</span>
      </a>

      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 text-xs text-slate-500">
        <FaShieldAlt className="text-[#0F766E] text-lg shrink-0" />
        <span>Asesoramiento personalizado sin compromiso con Corredora Matriculada.</span>
      </div>
    </div>
  );
}

export default DatosPropiedad;