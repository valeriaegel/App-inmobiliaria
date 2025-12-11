import { FaPhone, FaEnvelope } from 'react-icons/fa';

/*
  * Componente para mostrar información sobre servicios contables.
*/

const ServicioContable = () => {
    
    const telefonoCDORA = "5493442625374"; 
    const whatsappUrl = `https://wa.me/${telefonoCDORA}?text=¡Hola%20Denise!%20Vi%20sus%20servicios%20en%20la%20web%20y%20quisiera%20solicitar%20una%20consulta%20contable.%20Mi%20nombre%20es...`;
 
return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
  <div className=" container p-8 rounded-xl shadow-lg bg-[#C6CFCC] mx-auto text-center mt-16 max-w-3xl transition duration-300 hover:shadow-xl">
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
        <div className=' container bg-[#9CB0B1] p-5 rounded-lg mt-8 text-white inline-block w-90%'>
         <h3 className="text-xl font-bold mb-4 text-[#253E57]">Contacto</h3>
                         <ul className="space-y-3 rounded-lg ">
                             {/* Teléfono */}                             
                                 <li className="flex items-center space-x-2  pt-3 border-t border-[#253E57]">
                                     <FaPhone className='shrink-0 text-[#253E57]'/>
                                        <a 
                                        href={whatsappUrl}     
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-[#253E57] font-bold hover:text-gray-200">
                                        +549 3442625374
                                        </a>
                                 </li>
                             {/* Email */}
                                 <li className="flex items-center space-x-2 ">
                                     <FaEnvelope className='text-[#253E57]'/>
                                     <a href={`mailto:${"deniseegel@gmail.com"}`}
                                     target="_blank" 
                                        rel="noopener noreferrer" 
                                     className="text-[#253E57] font-bold hover:text-gray-200">{ "deniseegel@gmail.com"}</a>
                                 </li>
                        </ul>
        </div>
        
  </div>
 </div>
  )
}

export default ServicioContable