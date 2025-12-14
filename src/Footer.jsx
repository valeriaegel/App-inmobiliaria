import { FaHome, FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; 

// Datos de contacto y redes sociales
const telefono= '+54 9 3442 666333';
const email= 'inmobiliariaeckerdt@gmail.com';
const url_Facebook= 'https://www.facebook.com/InmobiliariaCristinaEckerdt';
const url_Instagram= 'https://www.instagram.com/inmobiliariacristinaeckerdt/';

/**
 * Componente del Pie de Página que consume los datos de contacto de Strapi.
 */
function Footer() {
 
  const colorAzul = 'text-primary-blue'; 

  return (
    <footer className="bg-[#253E57] text-gray-300 pt-8 border-t-6 border-primary-blue ">
      <div className="mx-auto px-6">
        
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Columna 1: Logo */}
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <FaHome className={`text-3xl ${colorAzul}`} />
                        <h3 className="text-xl font-bold text-white">Inmobiliaria Cristina Eckerdt</h3>
                    </div>
                    <p className="text-sm">
                        Venta, alquiler, tasaciones y administración de propiedades
                    </p>
                </div>
                {/* Columna 2: Información de Contacto  */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">Contacto</h3>
                    <ul className="space-y-3 p-4 bg-[#9CB0B1] rounded-lg w-full max-w-xs">
                        {/* Teléfono */}         
                            <li className="flex items-center space-x-2 text-[#253E57]">
                                <FaPhone className={colorAzul} />
                                <a href={`tel:${telefono}`} className="hover:text-primary-blue">{telefono}</a>
                            </li>
                        {/* Email */}
                            <li className="flex items-center space-x-2 text-[#253E57]">
                                <FaEnvelope className='shrink-0 text-primary-blue' />
                                <a href={`mailto:${email}`} className="hover:text-primary-blue">Inmobiliariaeckerdt@gmail.com</a>
                            </li>
                   </ul>
                </div>
                {/* Columna 3: Información de Redes */}
                <div >
                     <ul>
                        <h3 className="text-xl font-semibold mb-4 text-white">Redes Sociales</h3>
                        {/* Redes Sociales */}
                        <li className="flex space-x-4 mt-4 pt-2 border-t border-gray-700">
                                <a href={url_Facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-blue transition duration-200">
                                    <FaFacebook className="text-2xl" />
                                </a>                            
                                <a href={url_Instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-blue transition duration-200">
                                    <FaInstagram className="text-2xl" />
                                </a>
                
                        </li>
                    </ul>
                </div>
            </div>
       </div>

      {/* Derechos de autor y base */}
      <div className="mt-6 pt-2 border-t border-gray-700 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()}. By <a href="https://www.linkedin.com/in/valeria-egel-abb685155/" className='hover:text-gray-800'>Valeria Egel.</a>
      </div>
    </footer>
  );
}

export default Footer;