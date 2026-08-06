import { useContext } from 'react';
import PorOperaciones from './PorOperaciones';
import PropRecientes from './PropRecientes';
import { PropertyContext } from '../context/PropertyContext';
import MapaPropiedades from './MapaPropiedades';
import { FaFire } from 'react-icons/fa';

function ContenedorPP() {
    const { allInmuebles, loading, error } = useContext(PropertyContext);

    const propiedadesRecientes = [...(allInmuebles || [])]
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 2);

    return (
        <section className="container mx-auto py-12 md:py-20 px-4 md:px-8 space-y-12">
            
            {/* Grid 2 Columnas: Por Operaciones + Propiedades Recientes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* Columna Izquierda: Accesos por Operación */}
                <div>
                    <PorOperaciones />
                </div>

                {/* Columna Derecha: Útimos Ingresos */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-600">
                                <FaFire className="text-xl" />
                            </div>
                            <h2 className="text-2xl font-extrabold text-[#1E293B] tracking-tight">
                                Últimos Ingresos
                            </h2>
                        </div>
                        <span className="text-xs font-semibold text-slate-400">Novedades</span>
                    </div>

                    <PropRecientes
                        propiedades={propiedadesRecientes}
                        cargando={loading}
                        error={error}
                    />
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