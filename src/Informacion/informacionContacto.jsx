import MapaOficina from './MapaOficina';

/**
 * Componente que muestra la sección de datos + mapa.
 */

function InformacionContacto() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-12 mx-auto max-w-7xl ">
        <div className="@container bg-[#C6CFCC] p-8 md:p-10 rounded-xl shadow-lg  transition duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Información de Contacto
            </h3>
            
            <div className="space-y-6 ">
                
                {/* Ítem: Dirección */}
                <ContactItem 
                    icon="📍" 
                    title="Dirección"
                    content={
                        <>
                            Eva Peron 61, Oficina 15-Entrepiso<br/>
                            Entre Rios, Argentina
                        </>
                    }
                    enlace="https://www.google.com/maps?sca_esv=d44b221d688bac1f&output=search&q=inmobiliaria+cristina+eckerdt&source=lnms&fbs=AIIjpHx4nJjfGojPVHhEACUHPiMQht6_BFq6vBIoFFRK7qchKHDX9TtpZ992kyQpCWcw0WhoqqkQpEwIiVZWE9GXTg9wsVEMl0enKwYrJSEHlB6shhBzuyrjEAyuc2qIWfKzi29Xlu_CrPD0F2WsPcVRVgFvReB4l1qBn-LeEzqzt13HDoKxFwloGy2FNX83pFS4-YRR2TLbJM_LR7w709gzD7l1p310pw&entry=mc&ved=1t:200715&ictx=111"
                />
                
                {/* Ítem: Teléfono */}
                <ContactItem 
                    icon="📞" 
                    title="Teléfono"
                    content={
                        <>
                            +54 9 3442-666333
                        </>
                    }
                    enlace={`tel:+5493442666333`}
                />
                
                {/* Ítem: Email */}
                <ContactItem 
                    icon="📧" 
                    title="Email"
                    content={
                        <>
                            Inmobiliariaeckerdt@gmail.com
                        </>
                    }
                    enlace={`mailto:inmobiliariaeckerdt@gmail.com`} 
                />
                
                {/* Ítem: Horario de Atención */}
                <ContactItem 
                    icon="🕒" 
                    title="Horario de Atención"
                    content={
                        <>
                            Lunes a Viernes: 8:00 - 13:00 <br/>
                                             16:00 - 18:00 
                        </>
                    }
                />
                
            </div>
                </div>
        <div className="bg-[#C6CFCC] p-8 md:p-10 rounded-xl shadow-lg">   
            <MapaOficina />
        </div>
        </div>
        
    );
}

export default InformacionContacto;

/**
 * Subcomponente reutilizable para cada dato.
 */
function ContactItem({ icon, title, content , enlace}) {
    return (
        <div className="flex items-start space-x-4">
            {/* Contenedor del Ícono */}
            <div className=" text-2xl pt-2">
                <span className="text-blue-900">{icon}</span>
            </div>
            
            {/* Contenido */}
            <div className='mb-5'>
                <p className="text-md font-bold text-gray-900 mb-0.5">{title}</p>
                <div className="text-gray-600 text-base leading-relaxed hover:text-gray-700 transition duration-200">
                    <a href={enlace} target="_blank"  rel="noopener noreferrer">{content}</a>
                </div>
            </div>
        </div>

        
        
    );
}