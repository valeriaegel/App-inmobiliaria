import MapaOficina from './MapaOficina';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaExternalLinkAlt } from 'react-icons/fa';

function InformacionContacto() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-6 mx-auto max-w-7xl my-12">
            
            {/* Tarjeta de Información */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 space-y-8">
                <div>
                    <h3 className="text-3xl font-extrabold text-[#1E293B] mb-2 tracking-tight">
                        Información de Atención
                    </h3>
                    <p className="text-slate-500 text-sm">
                        Visítanos en nuestras oficinas o contáctate directamente por cualquiera de nuestros medios.
                    </p>
                </div>
                
                <div className="space-y-6 border-t border-slate-100 pt-6">
                    {/* Dirección */}
                    <ContactItem 
                        icon={<FaMapMarkerAlt />} 
                        title="Oficina Central"
                        content="Eva Perón 61, Oficina 15 - Entrepiso, Concepción del Uruguay, Entre Ríos, Argentina"
                        enlace="https://www.google.com/maps?q=inmobiliaria+cristina+eckerdt"
                    />
                    
                    {/* Teléfono Generales y Ventas */}
                    <ContactItem 
                        icon={<FaPhoneAlt />} 
                        title="Consultas Generales & Ventas"
                        content="+54 9 3442-666333"
                        enlace="https://wa.me/5493442666333?text=¡Hola%20Cristina!%20Quisiera%20realizar%20una%20consulta."
                    />

                    {/* Teléfono Alquileres */}
                    <ContactItem 
                        icon={<FaPhoneAlt />} 
                        title="Alquileres"
                        content="+54 9 3442-640929"
                        enlace="https://wa.me/5493442640929?text=¡Hola!%20Quisiera%20realizar%20una%20consulta%20sobre%20alquileres."
                    />
                    
                    {/* Email */}
                    <ContactItem 
                        icon={<FaEnvelope />} 
                        title="Correo Electrónico"
                        content="inmobiliariaeckerdt@gmail.com"
                        enlace="mailto:inmobiliariaeckerdt@gmail.com" 
                    />
                    
                    {/* Horario */}
                    <ContactItem 
                        icon={<FaClock />} 
                        title="Horario de Atención"
                        content="Lunes a Viernes: 8:00 a 14:00 hs"
                    />
                </div>
            </div>

            {/* Tarjeta de Mapa de la Oficina */}
            <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-100 flex flex-col justify-between">   
                <div className="p-3 mb-2 flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">Ubicación en Google Maps</span>
                    <span className="text-xs text-[#0F766E] font-semibold bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                        Oficina 15
                    </span>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-inner border border-slate-200 h-full min-h-[350px]">
                    <MapaOficina />
                </div>
            </div>

        </div>
    );
}

export default InformacionContacto;

function ContactItem({ icon, title, content, enlace }) {
    return (
        <div className="flex items-start space-x-4 group">
            <div className="p-3 bg-[#0F766E]/10 text-[#0F766E] rounded-2xl text-xl shrink-0 group-hover:bg-[#0F766E] group-hover:text-white transition-all duration-300">
                {icon}
            </div>
            
            <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">{title}</p>
                {enlace ? (
                    <a 
                        href={enlace} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-800 font-semibold text-sm hover:text-[#0F766E] transition-colors inline-flex items-center gap-1.5 leading-relaxed"
                    >
                        <span>{content}</span>
                        <FaExternalLinkAlt className="text-[10px] opacity-60" />
                    </a>
                ) : (
                    <p className="text-slate-800 font-semibold text-sm leading-relaxed">{content}</p>
                )}
            </div>
        </div>
    );
}
