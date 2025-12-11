import { useState, useEffect } from 'react';
import { FaHome, FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; 

// URL base para la API de ConfiguracionGlobal
const API_URL_CONFIG = `${import.meta.env.VITE_STRAPI_BASE_URL}/api/informacion-general`;

/**
 * Componente del Pie de Página que consume los datos de contacto de Strapi.
 */
function Footer() {
  const [config, setConfig] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerConfiguracion = async () => {
      try {
        const respuesta = await fetch(API_URL_CONFIG);
        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        // Strapi v4 envuelve el Single Type en 'data.attributes'
        setConfig(datos.data); 
      } catch (err) {
        // En caso de error, usamos valores predeterminados
        console.error("No se pudo cargar la configuración global:", err);
        setConfig({}); 
      } finally {
        setCargando(false);
      }
    };

    obtenerConfiguracion();
   
  }, []);

  // Si aún no ha cargado, o falló la carga, se usa un objeto vacío o cargando
  const datosContacto = config || {}; 
  const colorAzul = 'text-primary-blue'; // Usamos el color de marca que definimos

  return (
    <footer className="bg-[#253E57] text-gray-300 pt-8 border-t-6 border-primary-blue">
      <div className="mx-auto px-6">
        
        {cargando ? (
            <div className="text-center py-10">Cargando datos de contacto...</div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Columna 1: Logo */}
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <FaHome className={`text-3xl ${colorAzul}`} />
                        <h3 className="text-xl font-bold text-white">Inmobiliaria Cristina Eckerdt</h3>
                    </div>
                    <p className="text-sm">
                        Servicios inmoniliarios, somos profesionales en venta y alquiler de propiedades
                    </p>
                </div>
                {/* Columna 2: Información de Contacto (usando datos de Strapi) */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">Contacto</h3>
                    <ul className="space-y-3 p-4 bg-[#9CB0B1] rounded-lg w-full max-w-xs">
                        {/* Teléfono */}
                        {datosContacto.Telefono && (
                            <li className="flex items-center space-x-2 text-[#253E57]">
                                <FaPhone className={colorAzul} />
                                <a href={`tel:${datosContacto.Telefono}`} className="hover:text-primary-blue">{datosContacto.Telefono}</a>
                            </li>
                        )}
                        {/* Email */}
                        {datosContacto.Mail && (
                            <li className="flex items-center space-x-2 text-[#253E57]">
                                <FaEnvelope className='shrink-0 text-primary-blue' />
                                <a href={`mailto:${datosContacto.Mail}`} className="hover:text-primary-blue">Inmobiliariacristinaeckerdt@gmail.com</a>
                            </li>
                        )}

                   </ul>
                </div>
                {/* Columna 3: Información de Redes */}
                <div >
                     <ul>
                        <h3 className="text-xl font-semibold mb-4 text-white">Redes Sociales</h3>
                        {/* Redes Sociales */}
                        <li className="flex space-x-4 mt-4 pt-2 border-t border-gray-700">
                            {datosContacto.URL_Facebook && (
                                <a href={datosContacto.URL_Facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-blue transition duration-200">
                                    <FaFacebook className="text-2xl" />
                                </a>
                            )}
                            {datosContacto.URL_Instagram && (
                                <a href={datosContacto.URL_Instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-blue transition duration-200">
                                    <FaInstagram className="text-2xl" />
                                </a>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        )}
      </div>

      {/* Derechos de autor y base */}
      <div className="mt-6 pt-2 border-t border-gray-700 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()}. By <a href="https://www.linkedin.com/in/valeria-egel-abb685155/" className='hover:text-gray-800'>Valeria Egel.</a>
      </div>
    </footer>
  );
}

export default Footer;