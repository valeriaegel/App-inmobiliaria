import ServiceCard from './ServiceCard';
import ServicioContable from './ServicioContable';
import { FaCertificate, FaBuilding, FaHandshake, FaChartLine } from 'react-icons/fa';

const Servicios = () => {
    return (
        <section className="py-16 md:py-24 bg-slate-50/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                
                {/* Encabezado de la Sección */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 bg-[#0F766E]/10 text-[#0F766E] px-4 py-1.5 rounded-full text-xs font-bold border border-[#0F766E]/20">
                        <FaCertificate /> Corredora Inmobiliaria Matriculada
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] tracking-tight">
                        Nuestros Servicios Profesionales
                    </h1>

                    <p className="text-slate-600 text-lg font-medium">
                        María Cristina Eckerdt — <span className="text-[#0F766E] font-bold">Matrícula 856 C.I.E.R</span>
                    </p>

                    <p className="text-slate-500 text-sm max-w-xl mx-auto">
                        Brindamos soluciones integrales respaldadas por el{' '}
                        <a 
                            href="https://colegiocorredoreser.org.ar/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[#0F766E] underline hover:text-[#1E293B] font-semibold transition-colors"
                        >
                            Colegio de Corredores Públicos Inmobiliarios de Entre Ríos
                        </a>.
                    </p>
                </div>

                {/* Grid de Tarjetas de Servicio */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Tarjeta 1: Administración de Alquileres */}
                    <ServiceCard
                        icon={<FaBuilding />} 
                        title="Administración de Alquileres"
                        description="Gestión integral y despreocupada para propietarios e inquilinos."
                        items={[
                            "Selección de inquilinos",
                            "Cobro puntual y liquidaciones",
                            "Supervisión y mantenimiento",
                        ]}
                        Link="¡Hola%20Cristina!%20Quiero%20mas%20informacion%20sobre%20su%20servicio%20de%20administracion%20de%20alquileres."
                    />

                    {/* Tarjeta 2: Compra y Venta */}
                    <ServiceCard
                        icon={<FaHandshake />}
                        title="Compra y Venta Inmobiliaria"
                        description="Acompañamiento en cada etapa de negociación con máxima transparencia."
                        items={[
                            "Asesoría legal y documental",
                            "Promoción en portales inmobiliarios",
                            "Negociación profesional",
                        ]}
                        Link="¡Hola%20Cristina!%20Quiero%20mas%20informacion%20sobre%20su%20servicio%20de%20compra%20y%20venta."
                    />

                    {/* Tarjeta 3: Tasaciones */}
                    <ServiceCard
                        icon={<FaChartLine />}
                        title="Tasaciones Profesionales"
                        description="Valuaciones precisas respaldadas por análisis comparativo de mercado."
                        items={[
                            "Informes técnicos y detallados",
                            "Valor de mercado actual",
                            "Asesoramiento estratégico",
                        ]}
                        Link="¡Hola%20Cristina!%20Quiero%20mas%20informacion%20sobre%20su%20servicio%20de%20tasaciones."              
                    />
                </div>
            </div>

            {/* Servicio Contable Complementario */}
            <ServicioContable />

        </section>
    );
}

export default Servicios;



