import { Link } from 'react-router-dom';
import { FaHome, FaKey, FaArrowRight } from 'react-icons/fa';

function PorOperaciones() {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100">
      <h2 className="text-2xl font-extrabold text-[#1E293B] mb-2 tracking-tight">
        Explora según tu necesidad
      </h2>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Venta Card */}
        <Link 
          to="/propiedades/Venta" 
          className="group relative overflow-hidden bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-6 rounded-2xl text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-emerald-400 group-hover:scale-110 transition-transform">
              <FaHome className="text-2xl" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-white/10 px-3 py-1 rounded-full">
              Comprar
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1 group-hover:text-emerald-400 transition-colors">
              Propiedades en Venta
            </h3>
            <p className="text-slate-300 text-xs mb-4">Casas, departamentos, terrenos y locales comerciales.</p>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
              Ver Catálogo <FaArrowRight />
            </span>
          </div>
        </Link>

        {/* Alquiler Card */}
        <Link 
          to="/propiedades/Alquiler" 
          className="group relative overflow-hidden bg-gradient-to-br from-[#0F766E] to-[#0D9488] p-6 rounded-2xl text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-teal-200 group-hover:scale-110 transition-transform">
              <FaKey className="text-2xl" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-100 bg-white/10 px-3 py-1 rounded-full">
              Alquilar
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-1 group-hover:text-teal-200 transition-colors">
              Propiedades en Alquiler
            </h3>
            <p className="text-teal-100 text-xs mb-4">Opciones residenciales y comerciales disponibles.</p>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-teal-200 group-hover:translate-x-1 transition-transform">
              Ver Catálogo <FaArrowRight />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PorOperaciones;
