import ServiceCard from './ServiceCard';
import ServicioContable from './ServicioContable';

/*
  * Componente que muestra la sección de servicios ofrecidos por la inmobiliaria.
*/

const Servicios = () => {
    return (
        // Contenedor principal de la sección
        <section className="py-16 md:py-24 bg-[#F0F2ED]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Encabezado de la Sección */}
                <div className="text-center mb-12 bg-[#C6CFCC] p-8 md:p-10 rounded-xl shadow-lg  transition duration-300 hover:shadow-xl">
                    <h2 className="text-4xl font-extrabold text-gray-900">
                        Nuestros Servicios
                    </h2>
                    <p className="mt-2 text-3xl font-bold text-gray-600">
                       Corredora: Maria Cristina Eckerdt
                    </p>
                    <p className="mt-2 text-xl font-bold text-gray-600">
                        Matricula 856 <a href="https://colegiocorredoreser.org.ar/" className='hover:text-gray-800'>C.I.E.R</a>
                    </p>
                </div>

                {/* Contenedor de las Tarjetas */}
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
                        bgColor="bg-[#C6CFCC]" 
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
                        bgColor="bg-[#C6CFCC]" 
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
                        bgColor="bg-[#C6CFCC]" 
                        textColor="text-indigo-800"
                        Link="¡Hola%20Cristina!%20Quiero%20mas%20informacion%20sobre%20su%20servicio%20de%20tasaciones.%20Mi%20nombre%20es..."              
                    />
             </div>
         </div>
        
         <ServicioContable/>

        </section>
    );
}

export default Servicios;


