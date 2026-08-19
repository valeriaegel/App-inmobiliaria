import Formulario from './Formulario.jsx';
import { FaComments } from 'react-icons/fa';

function Contacto() {
    return (
        <section className="py-16 md:py-24 bg-slate-50/70">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Columna Izquierda: Mensaje Directo */}
                    <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-[#0F766E]/10 text-[#0F766E] px-4 py-1.5 rounded-full text-xs font-bold border border-[#0F766E]/20">
                            <FaComments /> Contacto Directo
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] tracking-tight leading-tight">
                            ¿Tienes alguna consulta o propuesta?
                        </h1>

                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                            Completa el formulario y se generará automáticamente tu consulta por <strong className="text-[#0F766E]">WhatsApp</strong>.
                        </p>

                        <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-xs text-slate-500 inline-block">
                            💡 Te responderemos a la brevedad dentro del horario de atención.
                        </div>
                    </div>
                    
                    {/* Columna Derecha: Formulario */}
                    <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100">
                       <Formulario />
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Contacto;

