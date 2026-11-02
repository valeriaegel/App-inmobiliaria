import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImage from './assets/Logo.png';
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { TELEFONOS } from './utils/funContacto';

function Encabezado() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    const links = [
        { path: '/propiedades/Venta', label: 'Comprar' },
        { path: '/propiedades/Alquiler', label: 'Alquilar' },
        { path: '/servicios', label: 'Tasaciones', hash: '#tasaciones' },
    ];

    const isActive = (path) => {
        if (path === '/propiedades/Venta') return location.pathname === '/propiedades/Venta';
        return location.pathname.startsWith(path);
    };

    return (
        <header className="sticky top-0 z-50 glass-header transition-all duration-300">
            {/* Topbar informativa con teléfonos reales */}
            <div className="hidden bg-[#1E293B] px-6 py-1.5 text-xs text-slate-300 sm:block">
                <div className="container mx-auto flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[#0F766E]" aria-hidden="true" />
                        Concepción del Uruguay, Entre Ríos
                    </span>

                    <div className="flex items-center gap-5">
                        <a
                            href={`tel:${TELEFONOS.ventas.tel}`}
                            className="flex items-center gap-2 transition-colors hover:text-white"
                        >
                            <FaPhoneAlt className="text-[#0F766E]" aria-hidden="true" />
                            Ventas: {TELEFONOS.ventas.display}
                        </a>
                        <a
                            href={`tel:${TELEFONOS.alquileres.tel}`}
                            className="flex items-center gap-2 transition-colors hover:text-white"
                        >
                            <FaPhoneAlt className="text-[#0F766E]" aria-hidden="true" />
                            Alquileres: {TELEFONOS.alquileres.display}
                        </a>
                    </div>
                </div>
            </div>

            {/* Header Principal */}
            <div className="container mx-auto px-4 py-3.5 md:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="group flex items-center space-x-3 btn-press">
                        <div className="rounded-xl border border-slate-100 bg-white p-1.5 shadow-sm transition-transform duration-300 group-hover:scale-105">
                            <img
                                src={logoImage}
                                alt="Logo Cristina Eckerdt"
                                className="h-10 w-auto object-contain sm:h-12"
                            />
                        </div>
                    </Link>

                    {/* Navegación Desktop */}
                    <nav className="hidden items-center space-x-1 rounded-full border border-slate-200/60 bg-slate-100/80 p-1.5 shadow-inner md:flex lg:space-x-2">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.hash ? `${link.path}${link.hash}` : link.path}
                                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 btn-press ${
                                    isActive(link.path)
                                        ? 'bg-[#1E293B] text-white shadow-md'
                                        : 'text-slate-700 hover:bg-white/60 hover:text-[#0F766E]'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA + Hamburguesa */}
                    <div className="flex items-center space-x-3">
                        <Link
                            to="/contacto"
                            className="inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#0F766E] to-[#0D9488] px-6 text-sm font-bold text-white shadow-md transition-all duration-300 hover:from-[#0D9488] hover:to-[#0F766E] hover:shadow-lg btn-press"
                        >
                            Consultar
                        </Link>

                        {/* Botón Hamburguesa Móvil */}
                        <button
                            className="rounded-xl p-2.5 text-slate-700 transition-colors hover:bg-slate-100 md:hidden btn-press cursor-pointer"
                            onClick={toggleMenu}
                            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
                            aria-expanded={menuAbierto}
                        >
                            {menuAbierto ? (
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú Desplegable Móvil */}
            {menuAbierto && (
                <div className="animate-in slide-in-from-top border-b border-slate-200 bg-white/95 px-6 py-4 shadow-xl backdrop-blur-xl duration-300 md:hidden">
                    <nav className="flex flex-col space-y-2">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.hash ? `${link.path}${link.hash}` : link.path}
                                onClick={toggleMenu}
                                className={`rounded-xl px-4 py-3 font-semibold transition-all ${
                                    isActive(link.path)
                                        ? 'bg-[#1E293B] text-white'
                                        : 'text-slate-700 hover:bg-slate-100'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="mt-2 border-t border-slate-100 pt-3">
                            <p className="px-4 pb-2 text-xs font-bold uppercase tracking-wider text-[#475569]">
                                Teléfonos
                            </p>
                            <a
                                href={`tel:${TELEFONOS.ventas.tel}`}
                                onClick={toggleMenu}
                                className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                            >
                                <FaPhoneAlt className="text-[#0F766E]" aria-hidden="true" />
                                Ventas: {TELEFONOS.ventas.display}
                            </a>
                            <a
                                href={`tel:${TELEFONOS.alquileres.tel}`}
                                onClick={toggleMenu}
                                className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                            >
                                <FaPhoneAlt className="text-[#0F766E]" aria-hidden="true" />
                                Alquileres: {TELEFONOS.alquileres.display}
                            </a>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Encabezado;
