import React from 'react';
import MapaOficina from './MapaOficina';


function InformacionContacto() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-12 mx-auto max-w-7xl">
        <div className="@container bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Información de Contacto
            </h3>
            
            <div className="space-y-6 ">
                
                {/* Ítem: Dirección */}
                <ContactItem 
                    icon="📍" // Ícono de Mapa/Ubicación
                    title="Dirección"
                    content={
                        <>
                            Eva Peron 61, Oficina 15-Entrepiso<br/>
                            Entre Rios, Argentina
                        </>
                    }
                />
                
                {/* Ítem: Teléfono */}
                <ContactItem 
                    icon="📞" // Ícono de Teléfono
                    title="Teléfono"
                    content={
                        <>
                            +54 9 3442-666333
                        </>
                    }
                />
                
                {/* Ítem: Email */}
                <ContactItem 
                    icon="📧" // Ícono de Email
                    title="Email"
                    content={
                        <>
                            Inmobiliariacristinaeckerdt@gmail.com
                        </>
                    }
                />
                
                {/* Ítem: Horario de Atención */}
                <ContactItem 
                    icon="⏰" // Ícono de Reloj/Horario
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
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100">   
            <MapaOficina />
        </div>
    
        </div>
    );
}

export default InformacionContacto;

/**
 * Subcomponente reutilizable para cada línea de contacto (Dirección, Teléfono, etc.).
 */
function ContactItem({ icon, title, content }) {
    return (
        <div className="flex items-start space-x-4">
            {/* Contenedor del Ícono */}
            <div className=" text-xl pt-1">
                {/* 💡 Estilo del ícono (simulando el color azul oscuro) */}
                <span className="text-blue-900">{icon}</span>
            </div>
            
            {/* Contenido */}
            <div className='mb-5'>
                <p className="text-base font-semibold text-gray-900 mb-0.5">{title}</p>
                <div className="text-gray-600 text-sm leading-relaxed hover:text-pink-500 transition duration-200">
                    {content}
                </div>
            </div>
        </div>
    );
}