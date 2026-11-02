import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import TarjetaPropiedad from '../components/TarjetaPropiedad';

function PropiedadesSimilares({ propiedadActual, todasLasPropiedades = [] }) {
    if (!propiedadActual || !todasLasPropiedades.length) return null;

    const idActual = propiedadActual.documentId || propiedadActual.id;
    const operacionActual = propiedadActual.TipoOperacion;
    const tipoActual = propiedadActual.tipo_inmueble?.Tipo;

    // Filtrar excluyendo la actual
    const candidatas = todasLasPropiedades.filter(p => (p.documentId || p.id) !== idActual);

    // Priorizar misma operación y mismo tipo
    const prioritarias = candidatas.filter(p =>
        p.TipoOperacion === operacionActual && p.tipo_inmueble?.Tipo === tipoActual
    );

    // Secundarias: misma operación aunque distinto tipo
    const secundarias = candidatas.filter(p =>
        p.TipoOperacion === operacionActual && p.tipo_inmueble?.Tipo !== tipoActual
    );

    // Combinar sin duplicados
    const seleccionadas = [...prioritarias, ...secundarias].slice(0, 3);

    if (seleccionadas.length === 0) return null;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="space-y-5 border-t border-slate-200/80 pt-8">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <h3 className="text-2xl font-bold tracking-tight text-[#1E293B] sm:text-3xl">
                    Propiedades similares
                </h3>

                <Link
                    to={operacionActual ? `/propiedades/${operacionActual}` : '/propiedades/Venta'}
                    onClick={scrollToTop}
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#0F766E] transition-colors hover:text-[#0D9488] group cursor-pointer"
                >
                    <span>Ver más en {operacionActual || 'el catálogo'}</span>
                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
            </div>

            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
                {seleccionadas.map((prop) => (
                    <TarjetaPropiedad
                        key={prop.documentId || prop.id}
                        propiedad={prop}
                        onClick={scrollToTop}
                        className="min-w-[82%] snap-start sm:min-w-[48%] lg:min-w-0"
                    />
                ))}
            </div>
        </section>
    );
}

export default PropiedadesSimilares;
