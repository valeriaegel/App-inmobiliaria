
import { FaHome, FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; 

const Servicios = () => {
    // dentro de BotonWhatsApp.jsx, después de obtener el 'telefono'
const telefonoCDORA = "5493442625374"; // Reemplaza con el número real
const whatsappUrl = `https://wa.me/${telefonoCDORA}?text=¡Hola%20Denise!%20Vi%20sus%20servicios%20en%20la%20web%20y%20quisiera%20solicitar%20una%20consulta%20contable.%20Mi%20nombre%20es...`;

return (
    
        // Contenedor principal de la sección
        <section className="py-16 md:py-24 bg-[#F0F2ED]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                {/* Encabezado de la Sección */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900">
                        Nuestros Servicios
                    </h2>
                    <p className="mt-2 text-xl text-gray-600">
                        Soluciones integrales para todas tus necesidades inmobiliarias
                    </p>
                </div>

                {/* Contenedor de las Tarjetas (Grid/Flex) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Tarjeta 1: Administración de Alquileres */}
                    <ServiceCard
                        icon="🗝️" 
                        title="Administración de Alquileres"
                        description="Gestión completa de tus propiedades en alquiler."
                        items={[
                            "Selección de inquilinos",
                            "Cobro de alquileres",
                            "Mantenimiento preventivo",
                        ]}
                        // Fondo similar al azul claro/lavanda de la imagen
                        bgColor="bg-[#A3C4C9]" 
                        textColor="text-indigo-800"
                        Link="¡Hola%20Cristina!%20Quiero%20mas%20informacion%20sobre%20su%20servicio%20de%20administracion%20de%20alquileres.%20Mi%20nombre%20es..."
                    />

                    {/* Tarjeta 2: Compra y Venta */}
                    <ServiceCard
                        icon="🏠"
                        title="Compra y Venta"
                        description="Asesoramiento profesional en todas las etapas de compra o venta."
                        items={[
                            "Asesoría legal completa",
                            "Marketing digital",
                            "Negociación profesional",
                        ]}
                        // Fondo similar al lila/rosado claro de la imagen
                        bgColor="bg-[#A3C4C9]" 
                        textColor="text-indigo-800"
                        Link="¡Hola%20Cristina!%20Quiero%20mas%20informacion%20sobre%20su%20servicio%20de%20compra%20y%20venta.%20Mi%20nombre%20es..."
                    />

                    {/* Tarjeta 3: Tasaciones */}
                    <ServiceCard
                        icon="📈"
                        title="Tasaciones"
                        description="Valuaciones precisas y certificadas por profesionales matriculados. Informes detallados basados en análisis de mercado actualizado."
                        items={[
                            "Análisis de mercado",
                        ]}
                        // Fondo similar al verde claro de la imagen
                        bgColor="bg-[#A3C4C9]" 
                        textColor="text-indigo-800"
                        Link="¡Hola%20Cristina!%20Quiero%20mas%20informacion%20sobre%20su%20servicio%20de%20tasaciones.%20Mi%20nombre%20es..."              
              />

                </div>
            </div>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
  <div className=" container p-8 rounded-xl shadow-lg bg-[#A3C4C9] mx-auto text-center mt-16 max-w-3xl">
      <h1 className='text-2xl font-bold mb-3 text-gray-900'>
        Otros servicios</h1>
      <p className="mt-4 text-gray-700 ">
            En Inmobiliaria Cristina Eckerdt contamos con servicios contables:   
     </p>
     <div className='text-left mt-6'>
        <ul className="list-disc list-inside mt-2">
                <li  className="flex  text-gray-700">
                        {/* Checkmark (simulado con emoji o ícono de check) */}
                        <span className={`mr-2 text-sm font-bold  text-indigo-800`}>✓</span>
                        Contadora: Denise Florencia Egel 
                    </li>
                       <li  className="flex items-start text-gray-700">
                        {/* Checkmark (simulado con emoji o ícono de check) */}
                        <span className={`mr-2 text-sm font-bold text-indigo-800 `}>✓</span>
                     Matricula: 5508 C.P.C.E.E.R
                    </li>
             <li className="flex items-start text-gray-700">
                        {/* Checkmark (simulado con emoji o ícono de check) */}
                        <span className={`mr-2 text-sm font-bold text-indigo-800`}>✓ </span>
                      <p>Servicios: Declaraciones Juradas, Asesoramiento impositivo y contable para personas físicas y jurídicas.</p>
                 </li>
        </ul>
         </div>
        <div className=' bg-[#253E57] p-5 rounded-lg mt-8 text-white inline-block w-1/2'>
         <h3 className="text-xl font-semibold mb-4 text-white">Contacto</h3>
                         <ul className="space-y-3 rounded-lg ">
                             {/* Teléfono */}
                             
                                 <li className="flex items-center space-x-2  pt-3 border-t border-gray-100">
                                     <FaPhone />
                                        <a 
                                        href={whatsappUrl}     
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="hover:text-primary-blue">
                                        5493442625374
                                        </a>
                                 </li>
                             {/* Email */}
                                 <li className="flex items-center space-x-2">
                                     <FaEnvelope />
                                     <a href={`mailto:${" deniseegel@gmail.com"}`}
                                     className="hover:text-primary-blue">{ "deniseegel@gmail.com"}</a>
                                 </li>
                        </ul>
        </div>
        
  </div>
 </div>

        </section>
    );
}

export default Servicios;


/**
 * Subcomponente reutilizable para cada tarjeta de servicio.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.icon - Icono o emoji para el servicio.
 * @param {string} props.title - Título del servicio.
 * @param {string} props.description - Descripción breve del servicio.
 * @param {string[]} props.items - Lista de características incluidas.
 * @param {string} props.bgColor - Clase de Tailwind para el color de fondo.
 * @param {string} props.textColor - Clase de Tailwind para el color principal.
 * @param {string} props.Link - Clase de Tailwind para el color del enlace.
*/
function ServiceCard({ icon, title, description, items, bgColor, textColor, Link }) {
    return (
        <div className={`p-8 rounded-xl shadow-lg transition duration-300 hover:shadow-xl ${bgColor}`}>
            
            {/* Ícono */}
            <div className={`w-12 h-12 flex items-center justify-center rounded-lg text-2xl mb-4 bg-white/70 ${textColor}`}>
                {icon}
            </div>

            {/* Título y Descripción */}
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {title}
            </h3>
            <p className="text-gray-600 mb-6">
                {description}
            </p>

            {/* Lista de Características */}
            <ul className="space-y-3 mb-6">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                        {/* Checkmark (simulado con emoji o ícono de check) */}
                        <span className={`mr-2 text-sm font-bold ${textColor}`}>✓</span>
                        {item}
                    </li>
                ))}
            </ul>

            {/* Enlace "Más información" */}
            <div className="mt-auto">
                <a href={`https://wa.me/5493442666333?text=${Link}`} className={`flex items-center text-sm font-semibold text-[#253E57] hover:underline`}>
                    Más información
                    <span className="ml-1 text-base">→</span>
                </a>
            </div>
        </div>
    );
}