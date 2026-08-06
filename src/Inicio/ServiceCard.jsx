
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

function ServiceCard({ icon, title, description, items, Link }) {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group">
            <div>
                {/* Ícono destacado */}
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl text-2xl mb-6 bg-[#0F766E]/10 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white transition-all duration-300">
                    {icon}
                </div>

                {/* Título y Descripción */}
                <h3 className="text-xl font-bold mb-3 text-[#1E293B] group-hover:text-[#0F766E] transition-colors">
                    {title}
                </h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                    {description}
                </p>

                {/* Lista de Características */}
                <ul className="space-y-3 mb-8 border-t border-slate-100 pt-4">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center text-slate-700 text-sm gap-2.5">
                            <FaCheckCircle className="text-[#0F766E] text-base shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Enlace WhatsApp */}
            <a 
                href={`https://wa.me/5493442666333?text=${Link}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-between w-full py-3 px-5 rounded-2xl bg-slate-50 hover:bg-[#1E293B] text-[#1E293B] hover:text-white font-bold text-xs transition-all duration-300 shadow-sm"
            >
                <span>Solicitar Asesoramiento</span>
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </a>
        </div>
    );
}

export default ServiceCard;