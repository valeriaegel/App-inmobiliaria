import { useNavigate } from 'react-router-dom';
import imagenInicio from '../assets/Inicio.jpg';
import logoImage from '../assets/Logo.png';
import { FaHome, FaKey, FaArrowRight, FaHandshake, FaShieldAlt } from 'react-icons/fa';

const Bienvenida = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center px-4 py-16 text-white overflow-hidden"
      style={{ backgroundImage: `url('${imagenInicio}')` }}
    >
      {/* Dark gradient overlay con desenfoque suave */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/75 to-[#1E293B]/60 backdrop-brightness-95"></div>

      {/* Contenido Hero */}
      <div className="relative z-10 container mx-auto max-w-5xl text-center flex flex-col items-center">

        {/* Logo con tarjeta glassmorphic */}
        <div className="p-3 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl mb-8 border border-white/40 transform hover:scale-105 transition-transform duration-300">
          <img
            src={logoImage}
            alt="Logo Cristina Eckerdt Inmobiliaria"
            className="h-20 sm:h-24 w-auto object-contain"
          />
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight drop-shadow-lg text-white">
          Encontrá tu propiedad <span className="bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">ideal </span>
        </h1>

        <p className="text-lg sm:text-2xl text-slate-200 mb-10 font-light max-w-2xl leading-relaxed">
          Asesoramiento en venta, alquiler y administración de propiedades.
        </p>

        {/* Acceso Rápido al Catálogo */}
        <div className="w-full max-w-2xl glass-card p-5 sm:p-7 rounded-3xl shadow-2xl text-slate-800 border border-white/50 mb-12">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600 mb-4 text-center">
            ¿Qué tipo de propiedad estás buscando?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              onClick={() => navigate('/propiedades/Venta')}
              className="group py-4 px-6 rounded-2xl bg-[#1E293B] hover:bg-slate-800 text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-3 btn-press cursor-pointer"
            >
              <FaHome className="text-xl text-emerald-400" />
              <span>Propiedades en Venta</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/propiedades/Alquiler')}
              className="group py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0F766E] to-[#0D9488] hover:from-[#0D9488] hover:to-[#0F766E] text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-3 btn-press cursor-pointer"
            >
              <FaKey className="text-xl text-teal-200" />
              <span>Propiedades en Alquiler</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Badges de Confianza */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl pt-4 border-t border-white/10 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center justify-center gap-3 bg-white/5 py-2.5 px-4 rounded-xl backdrop-blur-sm border border-white/10">
            <FaHandshake className="text-emerald-400 text-xl" />
            <span>Atención Personalizada</span>
          </div>
          <div className="flex items-center justify-center gap-3 bg-white/5 py-2.5 px-4 rounded-xl backdrop-blur-sm border border-white/10">
            <FaHome className="text-emerald-400 text-xl" />
            <span>Gestión Profesional</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Bienvenida;
