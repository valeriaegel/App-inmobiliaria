import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImage from './assets/Logo.png'; 
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

function Encabezado() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const links = [
        { path: '/', label: 'Inicio' },
        { path: '/propiedades/Venta', label: 'Ventas' },
        { path: '/propiedades/Alquiler', label: 'Alquileres' },
        { path: '/servicios', label: 'Servicios' },
    ];

    return (
        <header className="sticky top-0 z-50 glass-header transition-all duration-300">
            {/* Topbar informativa sutil */}
            <div className="bg-[#1E293B] text-slate-300 text-xs py-1.5 px-6 hidden sm:block">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <span className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                            <FaPhoneAlt className="text-[#0F766E]" /> Concepción del Uruguay, Entre Ríos
                        </span>
                        <span className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                            <FaEnvelope className="text-[#0F766E]" /> Asesoramiento Inmobiliario 
                        </span>
                    </div>
                    <div className="font-medium text-emerald-400">
                        Atención Personalizada
                    </div>
                </div>
            </div>

            {/* Header Principal */}
            <div className="container mx-auto px-4 md:px-8 py-3.5">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="p-1.5 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                            <img 
                                src={logoImage} 
                                alt="Logo Cristina Eckerdt" 
                                className="h-10 sm:h-12 w-auto object-contain" 
                            />
                        </div>
                    </Link>
                    
                    {/* Navegación Desktop */}
                    <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
                        {links.map((link) => (
                            <Link 
                                key={link.path}
                                to={link.path} 
                                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                                    isActive(link.path)
                                        ? 'bg-[#1E293B] text-white shadow-md'
                                        : 'text-slate-700 hover:text-[#0F766E] hover:bg-white/60'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Botón CTA + Hamburguesa */}
                    <div className="flex items-center space-x-3">
                        <Link to="/contacto">
                            <button className="bg-gradient-to-r from-[#0F766E] to-[#0D9488] hover:from-[#0D9488] hover:to-[#0F766E] text-white font-bold py-2.5 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 text-sm">
                                Consultar
                            </button>
                        </Link>

                        {/* Botón Hamburguesa Móvil */}
                        <button 
                            className="p-2.5 text-slate-700 hover:bg-slate-100 rounded-xl md:hidden transition-colors" 
                            onClick={toggleMenu}
                            aria-label="Toggle Menu"
                        >
                            {menuAbierto ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú Desplegable Móvil */}
            {menuAbierto && (
                <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-4 animate-in slide-in-from-top duration-300 shadow-xl">
                    <nav className="flex flex-col space-y-2">
                        {links.map((link) => (
                            <Link 
                                key={link.path}
                                to={link.path} 
                                onClick={toggleMenu}
                                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                                    isActive(link.path)
                                        ? 'bg-[#1E293B] text-white font-semibold'
                                        : 'text-slate-700 hover:bg-slate-100'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Encabezado;
