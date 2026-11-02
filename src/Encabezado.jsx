import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import logoImage from './assets/Logo.png';
import { TELEFONOS } from './utils/funContacto';

const WHATSAPP_URL =
  `https://wa.me/${TELEFONOS.ventas.whatsapp}?text=` +
  encodeURIComponent('¡Hola! Vi la web y quisiera hacer una consulta.');

const links = [
  { path: '/propiedades/Venta', label: 'Comprar' },
  { path: '/propiedades/Alquiler', label: 'Alquilar' },
  { path: '/servicios', label: 'Servicios' },
];

function Encabezado() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  const linkBase =
    'rounded-[10px] px-4 py-3 text-[15px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]';
  const linkEstado = (path) =>
    isActive(path)
      ? 'bg-[#F0F2ED] text-[#1E293B] font-bold'
      : 'text-[#334155] font-semibold hover:bg-[#F0F2ED]';

  return (
    <header className="site-header sticky top-0 z-50 bg-white border-b border-[#E2E8F0]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-3.5">
        <Link
          to="/"
          className="flex items-center gap-3 text-[#1E293B] rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
        >
          <img
            src={logoImage}
            alt="Inmobiliaria Cristina Eckerdt"
            className="h-10 w-10 rounded-lg md:h-12 md:w-12 md:rounded-[10px]"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-[17px] font-bold md:text-lg">Cristina Eckerdt</span>
            <span className="hidden text-xs font-semibold text-[#475569] md:block">Inmobiliaria</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.path} to={l.path} className={`${linkBase} ${linkEstado(l.path)}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-xl bg-[#15803D] px-[18px] py-3 text-sm font-bold text-white transition-colors hover:bg-[#166534] md:flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
          >
            <FaWhatsapp className="text-lg" aria-hidden="true" />
            Escribinos
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir por WhatsApp"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-[#15803D] md:hidden"
          >
            <FaWhatsapp className="text-[22px]" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-expanded={menuAbierto}
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-[#1E293B] md:hidden"
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

      {menuAbierto && (
        <nav aria-label="Principal móvil" className="border-t border-[#E2E8F0] bg-white px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setMenuAbierto(false)}
                className={`${linkBase} ${linkEstado(l.path)} min-h-12 flex items-center`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#15803D] text-[15px] font-bold text-white"
            >
              <FaWhatsapp className="text-lg" aria-hidden="true" />
              Escribinos
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Encabezado;
