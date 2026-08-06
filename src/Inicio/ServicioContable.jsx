import { FaPhoneAlt, FaEnvelope, FaCalculator, FaCheckCircle, FaExternalLinkAlt } from 'react-icons/fa';

const ServicioContable = () => {
    const telefonoCDORA = "5493442625374"; 
    const whatsappUrl = `https://wa.me/${telefonoCDORA}?text=¡Hola%20Denise!%20Vi%20sus%20servicios%20en%20la%20web%20y%20quisiera%20solicitar%20una%20consulta%20contable.%20Mi%20nombre%20es...`;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mt-16">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-8 sm:p-12 rounded-3xl shadow-2xl text-white border border-slate-700/50 flex flex-col md:flex-row gap-8 items-center justify-between">
                
                {/* Información Contable */}
                <div className="flex-1 space-y-4 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-[#0F766E]/30 text-teal-300 text-xs font-bold px-4 py-1.5 rounded-full border border-teal-500/30 mb-2">
                        <FaCalculator /> Servicio Profesional Complementario
                    </div>

                    <h2 className="text-3xl font-extrabold text-white tracking-tight">
                        Asesoramiento Contable e Impositivo
                    </h2>

                    <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                        Atención personalizada a cargo de profesional matriculado para personas físicas y jurídicas.
                    </p>

                    <div className="space-y-2 pt-2 text-sm text-slate-200">
                        <div className="flex items-center gap-2.5 justify-center md:justify-start">
                            <FaCheckCircle className="text-emerald-400" />
                            <span className="font-semibold">Contadora: Denise Florencia Egel</span>
                        </div>
                        <div className="flex items-center gap-2.5 justify-center md:justify-start">
                            <FaCheckCircle className="text-emerald-400" />
                            <span>Matrícula 5508 <strong className="text-teal-300">C.P.C.E.E.R</strong></span>
                        </div>
                        <div className="flex items-start gap-2.5 justify-center md:justify-start text-xs text-slate-400 pt-1">
                            <FaCheckCircle className="text-emerald-400 shrink-0 mt-0.5" />
                            <span>Declaraciones Juradas, liquidación de impuestos y asesoramiento contable integral.</span>
                        </div>
                    </div>
                </div>

                {/* Card de Contacto Rápido */}
                <div className="w-full md:w-auto min-w-[280px] bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 space-y-4">
                    <h3 className="text-base font-bold text-white border-b border-white/10 pb-2">
                        Contacto Contable 
                    </h3>

                    <a 
                        href={whatsappUrl}     
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-3 p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-lg justify-center"
                    >
                        <FaPhoneAlt />
                        <span>+54 9 3442 625374</span>
                    </a>

                    <a 
                        href="mailto:deniseegel@gmail.com"
                        className="flex items-center gap-3 p-3 bg-slate-800/80 hover:bg-slate-800 text-slate-200 rounded-xl font-medium text-xs transition-all duration-300 justify-center border border-white/5"
                    >
                        <FaEnvelope className="text-teal-400" />
                        <span>deniseegel@gmail.com</span>
                    </a>
                </div>

            </div>
        </div>
    );
}

export default ServicioContable;
