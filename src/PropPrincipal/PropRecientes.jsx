import TarjetaPropiedad from '../components/TarjetaPropiedad';

function PropRecientes({ propiedades, cargando, error, operacion = 'Todas' }) {
    if (cargando) {
        return (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex h-96 flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-md">
                        <div className="mb-4 h-44 w-full skeleton-shimmer rounded-2xl"></div>
                        <div className="mb-2 h-4 w-1/3 skeleton-shimmer rounded-full"></div>
                        <div className="mb-4 h-5 w-3/4 skeleton-shimmer rounded-lg"></div>
                        <div className="mb-4 h-10 w-full skeleton-shimmer rounded-xl"></div>
                        <div className="h-10 w-full skeleton-shimmer rounded-xl"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center text-sm font-semibold text-rose-600">
                {error}
            </div>
        );
    }

    if (!propiedades || propiedades.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center text-sm font-medium text-[#475569]">
                {operacion === 'Todas'
                    ? 'No hay propiedades disponibles en este momento.'
                    : `No hay propiedades en ${operacion.toLowerCase()} por el momento.`}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {propiedades.map(propiedad => (
                <TarjetaPropiedad
                    key={propiedad.id || propiedad.documentId}
                    propiedad={propiedad}
                />
            ))}
        </div>
    );
}

export default PropRecientes;
