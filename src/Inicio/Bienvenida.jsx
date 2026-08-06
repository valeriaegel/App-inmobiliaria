import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imagenInicio from '../assets/Inicio.jpg';
import logoImage from '../assets/Logo.png'; 
import { FaSearch, FaHome, FaKey, FaHandshake, FaShieldAlt } from 'react-icons/fa';

const Bienvenida = () => {
  const [tipoOperacion, setTipoOperacion] = useState('Venta');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/propiedades/${tipoOperacion}`);
  };

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
          Encuentra tu próximo <span className="bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">hogar </span>
        </h1>
        
        <p className="text-lg sm:text-2xl text-slate-200 mb-10 font-light max-w-2xl leading-relaxed">
          Asesoramiento en venta, alquiler y administración de propiedades.
        </p>

        {/* Buscador Rápido Flotante */}
        <div className="w-full max-w-3xl glass-card p-4 sm:p-6 rounded-3xl shadow-2xl text-slate-800 border border-white/50 mb-12">
          {/* Tabs Selector de Operación */}
          <div className="flex justify-center mb-5 space-x-2">
            <button
              onClick={() => setTipoOperacion('Venta')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                tipoOperacion === 'Venta'
                  ? 'bg-[#1E293B] text-white shadow-lg scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <FaHome /> Propiedades en Venta
            </button>
            <button
              onClick={() => setTipoOperacion('Alquiler')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                tipoOperacion === 'Alquiler'
                  ? 'bg-[#0F766E] text-white shadow-lg scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <FaKey /> Propiedades en Alquiler
            </button>
          </div>

          {/* Formulario de Búsqueda */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow bg-white/90 rounded-2xl px-4 py-3 border border-slate-200 flex items-center gap-3 text-slate-500 shadow-sm focus-within:ring-2 focus-within:ring-[#0F766E]">
              <FaSearch className="text-[#0F766E] text-lg shrink-0" />
              <span className="text-slate-700 text-sm font-medium">
                Catálogo disponible de propiedades en {tipoOperacion}
              </span>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-[#0F766E] to-[#0D9488] hover:from-[#0D9488] hover:to-[#0F766E] text-white font-bold py-3.5 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-base shrink-0"
            >
              <FaSearch /> Explorar Inmuebles
            </button>
          </form>
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
