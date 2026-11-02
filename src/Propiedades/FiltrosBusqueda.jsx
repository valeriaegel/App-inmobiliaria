import { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaTag, FaCity, FaRedo } from 'react-icons/fa';
import { PropertyContext } from '../context/PropertyContext';

function FiltrosBusqueda() {
    const { opcionesCiudades, opcionesTipos, loading } = useContext(PropertyContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [resetting, setResetting] = useState(false);

    // La URL es la única fuente de verdad de los filtros.
    const filtros = {
        ciudad: searchParams.get('ciudad') || '',
        tipoInmueble: searchParams.get('tipo') || '',
    };
    const hayFiltros = Boolean(filtros.ciudad || filtros.tipoInmueble);

    const handleFilterChange = (campo, valor) => {
        const nextParams = new URLSearchParams(searchParams);

        if (valor) {
            nextParams.set(campo, valor);
        } else {
            nextParams.delete(campo);
        }

        setSearchParams(nextParams, { replace: true });
    };

    const handleLimpiarFiltros = () => {
        setResetting(true);
        setTimeout(() => setResetting(false), 500);

        const nextParams = new URLSearchParams(searchParams);
        nextParams.delete('ciudad');
        nextParams.delete('tipo');
        setSearchParams(nextParams, { replace: true });
    };

    return (
        <div className="mx-auto mb-8 max-w-4xl rounded-3xl border border-slate-100 bg-white p-5 shadow-xl sm:p-6">
            <div className="mb-5 flex items-center gap-2.5 border-b border-slate-100 pb-4">
                <div className="rounded-xl bg-[#0F766E]/10 p-2 text-[#0F766E]">
                    <FaFilter aria-hidden="true" />
                </div>
                <h2 className="text-lg font-bold text-[#1E293B]">Filtrar catálogo</h2>
            </div>

            {loading ? (
                <p className="py-4 text-center text-sm font-medium text-[#475569]">
                    Cargando opciones...
                </p>
            ) : (
                <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">
                    {/* 1. TIPO DE PROPIEDAD */}
                    <div className="space-y-1.5">
                        <label
                            htmlFor="filtro-tipo"
                            className="flex items-center gap-1.5 text-xs font-bold text-[#475569]"
                        >
                            <FaTag className="text-[#0F766E]" aria-hidden="true" /> Tipo de inmueble
                        </label>
                        <select
                            id="filtro-tipo"
                            value={filtros.tipoInmueble}
                            onChange={(e) => handleFilterChange('tipo', e.target.value)}
                            className="min-h-11 w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-[#1E293B] outline-none transition-all focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/30"
                        >
                            <option value="">Todos los tipos</option>
                            {opcionesTipos.map(op => (
                                <option key={op.id} value={op.id}>{op.nombre}</option>
                            ))}
                        </select>
                    </div>

                    {/* 2. CIUDAD */}
                    <div className="space-y-1.5">
                        <label
                            htmlFor="filtro-ciudad"
                            className="flex items-center gap-1.5 text-xs font-bold text-[#475569]"
                        >
                            <FaCity className="text-[#0F766E]" aria-hidden="true" /> Ciudad
                        </label>
                        <select
                            id="filtro-ciudad"
                            value={filtros.ciudad}
                            onChange={(e) => handleFilterChange('ciudad', e.target.value)}
                            className="min-h-11 w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-[#1E293B] outline-none transition-all focus:border-[#0F766E] focus:bg-white focus:ring-2 focus:ring-[#0F766E]/30"
                        >
                            <option value="">Todas las ciudades</option>
                            {opcionesCiudades.map(op => (
                                <option key={op.id} value={op.id}>{op.nombre}</option>
                            ))}
                        </select>
                    </div>

                    {/* 3. RESTABLECER */}
                    <button
                        type="button"
                        onClick={handleLimpiarFiltros}
                        disabled={!hayFiltros}
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-[#1E293B] transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 btn-press cursor-pointer"
                    >
                        <FaRedo className={`text-xs ${resetting ? 'animate-spin' : ''}`} aria-hidden="true" />
                        <span>Restablecer</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default FiltrosBusqueda;
