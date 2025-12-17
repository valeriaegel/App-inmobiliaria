import { useState, useCallback, useContext } from 'react'; // Agregado useContext
import { FaFilter, FaHome, FaTag, FaCity, FaSearch } from 'react-icons/fa';
import { PropertyContext } from '../context/PropertyContext'; // Importación del contexto

/**
 * Componente de filtros avanzados para la lista de propiedades.
 * @param {function} onFiltrosAplicados - Función que recibe la cadena de query final.
 */
function FiltrosBusqueda({ onFiltrosAplicados }) {
    // --- DATOS DEL CONTEXTO ---
    // Extraemos las opciones ya cargadas y el estado de carga global
    const { opcionesCiudades, opcionesTipos, loading } = useContext(PropertyContext);

    const [filtros, setFiltros] = useState({
        ciudad: '',
        tipoInmueble: '',
        ambientes: '',
    });
    
    // Opciones estáticas para Ambientes
    const opcionesAmbientes = ['Cualquiera', 1, 2, 3, 4, '5+']; 

    // --- FUNCIÓN DE CONSTRUCCIÓN Y APLICACIÓN DE FILTROS ---
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
        <div className="bg-[#C6CFCC] p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
                <h3 className="text-xl font-bold text-primary-blue flex items-center">
                    <FaFilter className="mr-2"/> Filtros de Búsqueda
                </h3>
                <button 
                    onClick={handleLimpiarFiltros} 
                    className="text-sm text-gray-500 hover:text-primary-blue transition duration-200"
                >
                    Limpiar Filtros
                </button>
            </div>

            {/* Usamos el loading del Contexto */}
            {loading ? (
                <div className="text-center text-sm text-gray-500">Preparando opciones de búsqueda...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* 1. CIUDAD */}
                    <div className="col-span-1">
                        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center"><FaCity className="mr-1" /> Ciudad</label>
                        <select 
                            value={filtros.ciudad}
                            onChange={(e) => handleFilterChange('ciudad', e.target.value)}
                            className="w-full p-2 border border-gray-400 rounded-md focus:ring-primary-blue focus:border-primary-blue"
                        >
                            <option value="">Todas</option>
                            {opcionesCiudades.map(op => (
                                <option key={op.id} value={op.id}>{op.nombre}</option>
                            ))}
                        </select>
                    </div>

                    {/* 2. TIPO DE PROPIEDAD */}
                    <div className="col-span-1">
                        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center"><FaTag className="mr-1" /> Tipo de Propiedad</label>
                        <select 
                            value={filtros.tipoInmueble}
                            onChange={(e) => handleFilterChange('tipoInmueble', e.target.value)}
                            className="w-full p-2 border border-gray-400 rounded-md focus:ring-primary-blue focus:border-primary-blue"
                        >
                            <option value="">Todos</option>
                            {opcionesTipos.map(op => (
                                <option key={op.id} value={op.id}>{op.nombre}</option>
                            ))}
                        </select>
                    </div>

                    {/* 3. AMBIENTES */}
                    <div className="col-span-1">
                        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center"><FaHome className="mr-1" /> Ambientes</label>
                        <select 
                            value={filtros.ambientes}
                            onChange={(e) => handleFilterChange('ambientes', e.target.value)}
                            className="w-full p-2 border border-gray-400 rounded-md focus:ring-gray-500 focus:border-gray-300"
                        >
                            {opcionesAmbientes.map(op => <option key={op} value={op}>{op}</option>)}
                        </select>
                    </div>

                    {/* BOTÓN BUSCAR */}
                    <div className="col-span-1 md:col-span-1 flex md:items-end mt-4 md:mt-0">
                        <button
                            onClick={handleBuscarClick}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-200 flex items-center justify-center space-x-2"
                        >
                            <FaSearch />
                            <span>Buscar</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FiltrosBusqueda;