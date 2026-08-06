import { FaHome, FaFacebook, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const telefono = '+54 9 3442 666333';
const email = 'inmobiliariaeckerdt@gmail.com';
const url_Facebook = 'https://www.facebook.com/InmobiliariaCristinaEckerdt';
const url_Instagram = 'https://www.instagram.com/inmobiliariacristinaeckerdt/';

function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-8 border-t-4 border-[#0F766E]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Columna 1: Branding */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-[#0F766E] rounded-xl text-white shadow-lg">
                <FaHome className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">Inmobiliaria</h3>
                <span className="text-emerald-400 font-semibold text-sm">Cristina Eckerdt</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Asesoramiento inmobiliario en Concepción del Uruguay. Venta, alquiler y tasaciones.
            </p>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2">Navegación</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="text-emerald-500">›</span> Inicio
                </Link>
              </li>
              <li>
                <Link to="/propiedades/Venta" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="text-emerald-500">›</span> Propiedades en Venta
                </Link>
              </li>
              <li>
                <Link to="/propiedades/Alquiler" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="text-emerald-500">›</span> Propiedades en Alquiler
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="text-emerald-500">›</span> Nuestros Servicios
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="text-emerald-500">›</span> Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto Directo */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-[#0F766E] text-lg shrink-0 mt-0.5" />
                <span className="text-slate-400">Concepción del Uruguay, Entre Ríos, Argentina</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-[#0F766E] shrink-0" />
                <a 
                  href="https://wa.me/+5493442666333?text=¡Hola%20Cristina!%20Vi%20sus%20servicios%20en%20la%20web%20y%20quisiera%20realizar%20una%20consulta." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-emerald-400 transition-colors font-medium"
                >
                  {telefono}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-[#0F766E] shrink-0" />
                <a 
                  href={`mailto:${email}`} 
                  className="text-slate-300 hover:text-emerald-400 transition-colors break-all"
                >
                  {email}
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales & Horario */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 border-b border-slate-800 pb-2">Síguenos</h4>
            <p className="text-slate-400 text-xs mb-4">Seguinos en redes sociales para ver las últimas novedades inmobiliarias.</p>
            <div className="flex space-x-3 mb-6">
              <a 
                href={url_Facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-slate-800 hover:bg-[#0F766E] text-slate-300 hover:text-white rounded-xl transition-all duration-300 shadow-md"
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a 
                href={url_Instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-slate-800 hover:bg-[#0F766E] text-slate-300 hover:text-white rounded-xl transition-all duration-300 shadow-md"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
            </div>
            <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-400">
              <span className="block text-emerald-400 font-semibold mb-1">Horario de Atención</span>
              Lunes a Viernes: 8:00 hs a 14:00 hs
            </div>
          </div>

        </div>

        {/* Copyright y Créditos */}
        <div className="pt-8 border-t border-slate-800/80 text-center sm:flex sm:justify-between sm:items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Inmobiliaria Cristina Eckerdt. Todos los derechos reservados.</p>
          <p className="mt-2 sm:mt-0 flex items-center justify-center gap-1">
            Desarrollado por{' '}
            <a 
              href="https://www.linkedin.com/in/valeria-egel-abb685155/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-300 hover:text-emerald-400 font-medium inline-flex items-center gap-1 transition-colors"
            >
              Valeria Egel <FaExternalLinkAlt className="text-[10px]" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
