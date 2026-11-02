import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImage from './assets/Logo.png';
import { FaWhatsapp } from 'react-icons/fa';
import { TELEFONOS } from './utils/funContacto';

const MENSAJE_WHATSAPP = '¡Hola! Vi la web y quisiera hacer una consulta.';
const ENLACE_WHATSAPP = `https://wa.me/${TELEFONOS.ventas.whatsapp}?text=${encodeURIComponent(MENSAJE_WHATSAPP)}`;

const FOCUS_VISIBLE =
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]';

function Encabezado() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    const links = [
        { path: '/propiedades/Venta', label: 'Comprar' },
        { path: '/propiedades/Alquiler', label: 'Alquilar' },
        { path: '/servicios', label: 'Servicios', hash: '#tasaciones' },
    ];

    const isActive = (path) => {
        if (path === '/propiedades/Venta') return location.pathname === '/propiedades/Venta';
        return location.pathname.startsWith(path);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 md:px-6 md:py-3.5">

                {/* Marca */}
                <Link
                    to="/"
                    className={`flex shrink-0 items-center gap-3 rounded-[10px] ${FOCUS_VISIBLE}`}
                >
                    <img
                        src={logoImage}
                        alt="Logo Cristina Eckerdt"
                        className="h-10 w-10 rounded-[10px] object-contain md:h-12 md:w-12"
                    />
                    <span className="flex flex-col">
                        <span className="font-heading text-[17px] font-bold leading-tight text-[#1E293B] md:text-[18px]">
                            Cristina Eckerdt
                        </span>
                        <span className="hidden text-xs font-semibold text-[#475569] md:block">
                            Inmobiliaria
                        </span>
                    </span>
                </Link>

                {/* Navegación Desktop */}
                <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.hash ? `${link.path}${link.hash}` : link.path}
                            className={`rounded-[10px] px-4 py-3 text-[15px] font-semibold text-[#334155] transition-colors hover:bg-[#F0F2ED] ${FOCUS_VISIBLE} ${
                                isActive(link.path)
                                    ? 'bg-[#F0F2ED] font-bold text-[#1E293B]'
                                    : ''
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Acciones */}
                <div className="flex items-center gap-2">
                    {/* CTA Desktop */}
                    <a
                        href={ENLACE_WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hidden items-center gap-2 rounded-xl bg-[#15803D] px-[18px] py-3 text-sm font-bold text-white transition-colors hover:bg-[#166534] md:inline-flex ${FOCUS_VISIBLE}`}
                    >
                        <FaWhatsapp className="text-lg" aria-hidden="true" />
                        <span>Escribinos</span>
                    </a>

                    {/* Acciones Mobile */}
                    <div className="flex items-center gap-2 md:hidden">
                        <a
                            href={ENLACE_WHATSAPP}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Escribir por WhatsApp"
                            className={`inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#15803D] transition-colors hover:bg-[#15803D]/10 ${FOCUS_VISIBLE}`}
                        >
                            <FaWhatsapp className="text-2xl" aria-hidden="true" />
                        </a>

                        <button
                            type="button"
                            onClick={toggleMenu}
                            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
                            aria-expanded={menuAbierto}
                            aria-controls="menu-principal-movil"
                            className={`inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#334155] transition-colors hover:bg-[#F0F2ED] cursor-pointer ${FOCUS_VISIBLE}`}
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
                <div
                    id="menu-principal-movil"
                    className="animate-in slide-in-from-top border-b border-[#E2E8F0] bg-white px-4 py-4 duration-300 md:hidden"
                >
                    <nav aria-label="Principal móvil" className="flex flex-col gap-1">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.hash ? `${link.path}${link.hash}` : link.path}
                                onClick={toggleMenu}
                                className={`flex min-h-12 items-center rounded-[10px] px-4 text-[15px] font-semibold text-[#334155] transition-colors hover:bg-[#F0F2ED] ${FOCUS_VISIBLE} ${
                                    isActive(link.path)
                                        ? 'bg-[#F0F2ED] font-bold text-[#1E293B]'
                                        : ''
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <a
                            href={ENLACE_WHATSAPP}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={toggleMenu}
                            className={`mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#15803D] px-[18px] py-3 text-sm font-bold text-white transition-colors hover:bg-[#166534] ${FOCUS_VISIBLE}`}
                        >
                            <FaWhatsapp className="text-lg" aria-hidden="true" />
                            <span>Escribinos</span>
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Encabezado;
