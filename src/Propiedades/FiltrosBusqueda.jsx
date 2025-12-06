import { useState, useEffect, useCallback } from 'react';
import { FaFilter, FaHome, FaTag, FaCity, FaSearch } from 'react-icons/fa';

// URLS DE LAS COLECCIONES DINÁMICAS
const STRAPI_BASE_URL = 'http://localhost:1337';
const API_URL_CIUDADES = `${STRAPI_BASE_URL}/api/ciudads`; 
const API_URL_TIPO_INMUEBLE = `${STRAPI_BASE_URL}/api/tipo-inmuebles`; 


/**
 * Componente de filtros avanzados para la lista de propiedades.
 * @param {function} onFiltrosAplicados - Función que recibe la cadena de query final.
 */
function FiltrosBusqueda({ onFiltrosAplicados }) {
    
    // --- ESTADOS LOCALES ---
    const [opcionesCiudades, setOpcionesCiudades] = useState([]);
    const [opcionesTipos, setOpcionesTipos] = useState([]);
    const [cargandoOpciones, setCargandoOpciones] = useState(true);

    const [filtros, setFiltros] = useState({
        ciudad: '',
        tipoInmueble: '',
        ambientes: '',
    });
    
   
    // Opciones estáticas para Ambientes
    const opcionesAmbientes = ['Cualquiera', 1, 2, 3, 4, '5+']; 

    // --- EFECTO: Carga de Opciones Dinámicas (Ciudades y Tipos) ---
    useEffect(() => {
        const fetchOpciones = async () => {
            setCargandoOpciones(true);
            try {
                // Fetch de Ciudades
                const resCiudades = await fetch(`${API_URL_CIUDADES}?fields=Ciudad`);
                const datosCiudades = await resCiudades.json();
                
                // Fetch de Tipos de Inmueble
                const resTipos = await fetch(`${API_URL_TIPO_INMUEBLE}?fields=Tipo`);
                const datosTipos = await resTipos.json();
                
                // Procesar datos de Strapi (asumo { id, attributes: { Nombre } })
                // Mapeamos el ID y el Nombre para usar el ID en la query de filtro
                setOpcionesCiudades(datosCiudades.data.map(item => ({ id: item.id, nombre: item.Ciudad })));
                setOpcionesTipos(datosTipos.data.map(item => ({ id: item.id, nombre: item.Tipo })));

        
            } catch (error) {    
                console.error("Error al cargar opciones de filtro:", error);
            } finally {
                setCargandoOpciones(false);
            }
        };
        fetchOpciones();
    }, []);

    // --- FUNCIÓN DE CONSTRUCCIÓN Y APLICACIÓN DE FILTROS ---


    const construirQuery = useCallback(() => {
        const queryParts = [];
        
        // --- 1. Filtro por CIUDAD (Relación Many-to-One) ---
        if (filtros.ciudad) {
            // Filtra por el ID de la relación Many-to-One
            queryParts.push(`filters[ciudad][id][$eq]=${filtros.ciudad}`);
        }
        
        // --- 2. Filtro por TIPO DE PROPIEDAD (Relación Many-to-One) ---
        if (filtros.tipoInmueble) {
            // Filtra por el ID de la relación Many-to-One
            queryParts.push(`filters[tipo_inmueble][id][$eq]=${filtros.tipoInmueble}`);
        }
        
        // --- 3. Filtro por AMBIENTES (Número/Enumeration) ---
        if (filtros.ambientes && filtros.ambientes !== 'Cualquiera') {
             if (filtros.ambientes.includes('+')) {
                // Si es '5+', usamos mayor o igual ($gte)
                const valor = parseInt(filtros.ambientes.replace('+', ''), 10);
                queryParts.push(`filters[Ambientes][$gte]=${valor}`);
            } else {
                // Si es un número exacto, usamos igual ($eq)
                queryParts.push(`filters[Ambientes][$eq]=${filtros.ambientes}`);
            }
        }
        
        // Devolvemos la cadena completa de filtros (ej: filters[a]=1&filters[b]=2)
        return queryParts.join('&');
    }, [filtros]);

    const handleFilterChange = (campo, valor) => {
        // Establece el valor o una cadena vacía si es una opción "neutral"
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
        onFiltrosAplicados(''); // Llama al padre sin filtros
    };

    const handleBuscarClick = () => {
        const query = construirQuery();
        // Llama a la función del componente padre SOLAMENTE AHORA
        onFiltrosAplicados(query); 
    };
    
    // --- RENDERING DEL COMPONENTE ---
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
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

            {cargandoOpciones ? (
                <div className="text-center text-sm text-gray-500">Cargando opciones de filtro...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    
                    {/* 1. CIUDAD (Dinámico) */}
                    <div className="col-span-1">
                        <label className="text-sm font-medium text-gray-700 mb-1 items-center"><FaCity className="mr-1" /> Ciudad</label>
                        <select 
                            value={filtros.ciudad}
                            onChange={(e) => handleFilterChange('ciudad', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue"
                        >
                            <option value="">Todas</option>
                            {opcionesCiudades.map(op => <option key={op.id} value={op.id}>{op.nombre}</option>)}
                        </select>
                    </div>

                    {/* 2. TIPO DE PROPIEDAD (Dinámico) */}
                    <div className="col-span-1">
                        <label className="text-sm font-medium text-gray-700 mb-1 items-center"><FaTag className="mr-1" /> Tipo de Propiedad</label>
                        <select 
                            value={filtros.tipoInmueble}
                            onChange={(e) => handleFilterChange('tipoInmueble', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue"
                        >
                            <option value="">Todos</option>
                            {opcionesTipos.map(op => <option key={op.id} value={op.id}>{op.nombre}</option>)}
                        </select>
                    </div>

                    {/* 3. AMBIENTES (Estático/Enumeración) */}
                    <div className="col-span-1">
                        <label className="text-sm font-medium text-gray-700 mb-1 items-center"><FaHome className="mr-1" /> Ambientes</label>
                        <select 
                            value={filtros.ambientes}
                            onChange={(e) => handleFilterChange('ambientes', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue"
                        >
                            {opcionesAmbientes.map(op => <option key={op} value={op}>{op}</option>)}
                        </select>
                    </div>
                    <div className="col-span-1 md:col-span-1">
                    <button
                        onClick={handleBuscarClick}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-md transition duration-200 flex items-center justify-center space-x-2 mt-6 md:mt-0"
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