import { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropRecientes from './PropRecientes';
import { PropertyContext } from '../context/PropertyContext';
import MapaPropiedades from './MapaPropiedades';
import { FaChevronRight, FaChartLine } from 'react-icons/fa';

const TABS = ['Todas', 'Venta', 'Alquiler'];

function ContenedorPP() {
    const { allInmuebles, loading, error } = useContext(PropertyContext);
    const [operacionActiva, setOperacionActiva] = useState('Todas');
    const whatsappUrl= `https://wa.me/5493442666333?text=¡Hola%20Cristina!%20Vi%20sus%20servicios%20en%20la%20web%20y%20quisiera%20solicitar%20una%20consulta%20sobre%20su%20servicio%20de%20tasaciones.%20Mi%20nombre%20es...`;

    const propiedadesRecientes = useMemo(() => {
        return [...(allInmuebles || [])]
            .filter(propiedad =>
                operacionActiva === 'Todas' ||
                propiedad.TipoOperacion?.toLowerCase() === operacionActiva.toLowerCase()
            )
            .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
            .slice(0, 4);
    }, [allInmuebles, operacionActiva]);

    const operacionDestino = operacionActiva === 'Alquiler' ? 'Alquiler' : 'Venta';

    return (
        <section className="container mx-auto space-y-14 px-4 py-12 md:px-8 md:py-20">

            {/* Sección a todo el ancho: Últimos ingresos */}
            <div className="space-y-6">
                <div className="flex flex-col justify-between gap-3 border-b border-slate-200/80 pb-4 sm:flex-row sm:items-end">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-[#1E293B] sm:text-4xl">
                            Últimos ingresos
                        </h2>
                        <p className="mt-1 text-sm text-[#475569]">
                            Las propiedades más recientes de nuestra cartera.
                        </p>
                    </div>

                    <Link
                        to={`/propiedades/${operacionDestino}`}
                        className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-[#0F766E] transition-colors hover:text-[#1E293B]"
                    >
                        <span>Ver todas</span>
                        <FaChevronRight className="text-xs" aria-hidden="true" />
                    </Link>
                </div>

                {/* Tabs por operación */}
                <div
                    className="flex flex-wrap gap-2"
                    role="group"
                    aria-label="Filtrar últimos ingresos por operación"
                >
                    {TABS.map((tab) => {
                        const activa = operacionActiva === tab;
                        return (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setOperacionActiva(tab)}
                                aria-pressed={activa}
                                className={`inline-flex min-h-11 items-center rounded-full px-5 text-sm font-bold transition-colors btn-press cursor-pointer ${
                                    activa
                                        ? 'bg-[#1E293B] text-white shadow-md'
                                        : 'border border-slate-200 bg-white text-[#475569] hover:border-[#0F766E] hover:text-[#0F766E]'
                                }`}
                            >
                                {tab}
                            </button>
                        );
                    })}
                </div>

                <PropRecientes
                    propiedades={propiedadesRecientes}
                    cargando={loading}
                    error={error}
                    operacion={operacionActiva}
                />
            </div>

            {/* Bloque de tasaciones */}
            <div className="relative overflow-hidden rounded-3xl bg-[#1E293B] p-7 text-white shadow-xl sm:p-10">
                <div className="absolute -top-16 -right-10 h-48 w-48 rounded-full bg-[#0F766E]/25 blur-3xl" aria-hidden="true" />

                <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300">
                            <FaChartLine aria-hidden="true" /> Tasaciones
                        </span>
                        <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
                            ¿Querés saber cuánto vale tu propiedad?
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
                            Realizamos tasaciones profesionales con el valor de mercado actualizado.
                            Coordinamos una visita sin compromiso.
                        </p>
                    </div>
                    <a 
                        href={whatsappUrl}     
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-6 text-sm font-extrabold text-[#1E293B] shadow-lg transition-colors hover:bg-slate-100 btn-press"
                    >
                        <span>Solicitar tasación</span>
                        <FaChevronRight className="text-xs" aria-hidden="true" />
                    </a>
                </div>
            </div>

            {/* Fila del Mapa Interactivo */}
            <div>
                <MapaPropiedades />
            </div>

        </section>
    );
}

export default ContenedorPP;
