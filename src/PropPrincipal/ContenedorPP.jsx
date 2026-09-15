import { useContext } from 'react';
import { Link } from 'react-router-dom';
import PorOperaciones from './PorOperaciones';
import PropRecientes from './PropRecientes';
import { PropertyContext } from '../context/PropertyContext';
import MapaPropiedades from './MapaPropiedades';
import { FaChevronRight } from 'react-icons/fa';

function ContenedorPP() {
    const { allInmuebles, loading, error } = useContext(PropertyContext);

    const propiedadesRecientes = [...(allInmuebles || [])]
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 4);

    return (
        <section className="container mx-auto py-12 md:py-20 px-4 md:px-8 space-y-16">
            
            {/* Accesos por Operación */}
            <div>
                <PorOperaciones />
            </div>

            {/* Sección a todo el ancho: Últimos Ingresos */}
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-slate-200/80 pb-4">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] tracking-tight">
                            Últimos Ingresos
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Mostrando propiedades seleccionadas en cartera
                        </p>
                    </div>

                    <Link 
                        to="/propiedades/Venta" 
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F766E] hover:text-[#1E293B] transition-colors"
                    >
                        <span>Ver todas</span>
                        <FaChevronRight className="text-xs" />
                    </Link>
                </div>

                <PropRecientes
                    propiedades={propiedadesRecientes}
                    cargando={loading}
                    error={error}
                />
            </div>

            {/* Fila del Mapa Interactivo */}
            <div>
                <MapaPropiedades />
            </div>

        </section>
    );
}

export default ContenedorPP;