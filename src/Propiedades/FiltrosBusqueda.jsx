import { useState, useCallback, useContext } from 'react';
import { FaFilter, FaHome, FaTag, FaCity, FaSearch, FaRedo } from 'react-icons/fa';
import { PropertyContext } from '../context/PropertyContext';

function FiltrosBusqueda({ onFiltrosAplicados }) {
    const { opcionesCiudades, opcionesTipos, loading } = useContext(PropertyContext);

    const [filtros, setFiltros] = useState({
        ciudad: '',
        tipoInmueble: '',
        ambientes: '',
    });
    
    const opcionesAmbientes = ['Cualquiera', 1, 2, 3, 4, '5+']; 

    const construirQuery = useCallback(() => {
        const queryParts = []; 
        
        if (filtros.ciudad) {
            queryParts.push(`filters[ciudad][id][$eq]=${filtros.ciudad}`);
        }
        
        if (filtros.tipoInmueble) {
            queryParts.push(`filters[tipo_inmueble][id][$eq]=${filtros.tipoInmueble}`);
        }
        
        if (filtros.ambientes && filtros.ambientes !== 'Cualquiera') {
             if (filtros.ambientes.includes('+')) {
                const valor = parseInt(filtros.ambientes.replace('+', ''), 10);
                queryParts.push(`filters[Ambientes][$gte]=${valor}`);
            } else {
                queryParts.push(`filters[Ambientes][$eq]=${filtros.ambientes}`);
            }
        }
        return queryParts.join('&');
    }, [filtros]);

    const handleFilterChange = (campo, valor) => {
        const valorLimpio = valor === 'Todas' || valor === 'Todos' || valor === 'Cualquiera' || valor === '' ? '' : valor;
        setFiltros(prev => ({
            ...prev,
            [campo]: valorLimpio,
        }));
    };
    
    const handleLimpiarFiltros = () => {
        setFiltros({
            ciudad: '',
            tipoInmueble: '',
            ambientes: '',
        });
        onFiltrosAplicados(''); 
    };

    const handleBuscarClick = () => {
        const query = construirQuery();
        onFiltrosAplicados(query); 
    };
    
    return (
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 mb-10">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-[#0F766E]/10 rounded-xl text-[#0F766E]">
                        <FaFilter className="text-[#0F766E]" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">
                        Filtrar Catálogo
                    </h3>
                </div>

                <button 
                    onClick={handleLimpiarFiltros} 
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-rose-500 transition-colors"
                >
                    <FaRedo className="text-[10px]" /> Restablecer
                </button>
            </div>

            {loading ? (
                <div className="text-center py-4 text-xs font-medium text-slate-400">
                    Cargando opciones...
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    {/* 1. CIUDAD */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                            <FaCity className="text-[#0F766E]" /> Ciudad
                        </label>
                        <select 
                            value={filtros.ciudad}
                            onChange={(e) => handleFilterChange('ciudad', e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 text-sm font-medium focus:ring-2 focus:ring-[#0F766E] focus:bg-white outline-none transition-all"
                        >
                            <option value="">Todas las ciudades</option>
                            {opcionesCiudades.map(op => (
                                <option key={op.id} value={op.id}>{op.nombre}</option>
                            ))}
                        </select>
                    </div>

                    {/* 2. TIPO DE PROPIEDAD */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                            <FaTag className="text-[#0F766E]" /> Tipo de Inmueble
                        </label>
                        <select 
                            value={filtros.tipoInmueble}
                            onChange={(e) => handleFilterChange('tipoInmueble', e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 text-sm font-medium focus:ring-2 focus:ring-[#0F766E] focus:bg-white outline-none transition-all"
                        >
                            <option value="">Todos los tipos</option>
                            {opcionesTipos.map(op => (
                                <option key={op.id} value={op.id}>{op.nombre}</option>
                            ))}
                        </select>
                    </div>

                    {/* 3. AMBIENTES */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                            <FaHome className="text-[#0F766E]" /> Ambientes
                        </label>
                        <select 
                            value={filtros.ambientes}
                            onChange={(e) => handleFilterChange('ambientes', e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 text-sm font-medium focus:ring-2 focus:ring-[#0F766E] focus:bg-white outline-none transition-all"
                        >
                            {opcionesAmbientes.map(op => <option key={op} value={op}>{op}</option>)}
                        </select>
                    </div>

                    {/* BOTÓN BUSCAR */}
                    <div>
                        <button
                            onClick={handleBuscarClick}
                            className="w-full bg-gradient-to-r from-[#0F766E] to-[#0D9488] hover:from-[#0D9488] hover:to-[#0F766E] text-white font-bold p-3.5 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
                        >
                            <FaSearch />
                            <span>Aplicar Filtros</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FiltrosBusqueda;