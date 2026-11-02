import { FaRedo, FaSearchLocation } from 'react-icons/fa';
import TarjetaPropiedad from '../components/TarjetaPropiedad';

function PropiedadesSkeleton() {
    return (
        <div className="container mx-auto px-4 md:px-8 py-8">
            <div className="h-8 skeleton-shimmer rounded-xl w-64 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md h-[420px] flex flex-col justify-between p-4">
                        <div className="h-52 skeleton-shimmer rounded-2xl mb-4 w-full"></div>
                        <div className="h-5 skeleton-shimmer rounded-lg w-3/4 mb-3"></div>
                        <div className="h-4 skeleton-shimmer rounded-lg w-full mb-2"></div>
                        <div className="h-4 skeleton-shimmer rounded-lg w-2/3 mb-4"></div>
                        <div className="h-10 skeleton-shimmer rounded-2xl w-full mt-auto"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Propiedades({ inmuebles, cargando, error, tipoOperacion }) {
    if (cargando) {
        return <PropiedadesSkeleton />;
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="bg-rose-50 border border-rose-200 text-rose-600 p-8 rounded-3xl max-w-md mx-auto font-bold space-y-4 shadow-sm">
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center gap-2 bg-rose-600 text-white px-5 py-2.5 rounded-2xl text-xs font-bold hover:bg-rose-700 transition-colors shadow-md"
                    >
                        <FaRedo /> Reintentar conexión
                    </button>
                </div>
            </div>
        );
    }

    const titulo = tipoOperacion
        ? `Propiedades en ${tipoOperacion}`
        : 'Catálogo Completo de Propiedades';

    return (
        <div className="container mx-auto px-4 md:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 border-b border-slate-200 pb-4">
                <h2 className="text-3xl font-extrabold text-[#1E293B] tracking-tight">
                    {titulo}
                </h2>
                <span className="text-xs font-bold px-4 py-1.5 rounded-full bg-[#0F766E]/10 text-[#0F766E]">
                    {inmuebles.length} {inmuebles.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
                </span>
            </div>

            {inmuebles.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 text-center max-w-lg mx-auto my-8">
                    <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                        <FaSearchLocation />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Sin resultados disponibles</h3>
                    <p className="text-slate-500 text-sm">
                        No se encontraron inmuebles que coincidan con los filtros seleccionados. Prueba modificar la búsqueda.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {inmuebles.map(inmueble => (
                        <TarjetaPropiedad
                            key={inmueble.id || inmueble.documentId}
                            propiedad={inmueble}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Propiedades;
