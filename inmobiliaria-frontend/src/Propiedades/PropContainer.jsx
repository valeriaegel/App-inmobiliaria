import FiltrosBusqueda from "./FiltrosBusqueda"
import Propiedades from "./Propiedades" // Asumo Propiedades = ListaPropiedades
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

const STRAPI_BASE_URL = 'http://localhost:1337';
const API_BASE_URL = `${STRAPI_BASE_URL}/api/inmuebles`; 
// Query de Deep Populate
const POPULATE_QUERY = 'populate[Imagenes][populate]=*&populate[ciudad]=*&populate[tipo_inmueble]=*';

function PropContainer () {

    const { tipoOperacion } = useParams(); 

    // --- ESTADOS PRINCIPALES ---
    const [inmuebles, setInmuebles] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // *** CORRECCIÓN: Definición correcta del estado y su setter ***
    const [filtroAvanzadoQuery, setFiltroAvanzadoQuery] = useState('');

    // --- LÓGICA DEL FETCH Y FILTRADO ---
    useEffect(() => {
        const obtenerInmuebles = async () => {
            setCargando(true);
            setError(null);
            console.log('Tipo de Operación desde URL:', tipoOperacion);
            // 1. Filtro de Operación (de la URL)
            const filtroOperacionQuery = tipoOperacion
                ? // *** CORRECCIÓN CRÍTICA: toLowerCase() para evitar el 400 Bad Request ***
                  `filters[TipoOperacion][$eq]=${tipoOperacion}`
                : '';

            // 2. Combinación de Queries (Operación + Avanzado)
            const queries = [];
            if (filtroOperacionQuery) {
                queries.push(filtroOperacionQuery);
            }
            if (filtroAvanzadoQuery) {
                queries.push(filtroAvanzadoQuery); // <-- Ahora sí incluye el filtro de Busqueda
            }
            
            const queryTotal = queries.join('&');

            
            
            // 3. Construir la URL Final
            let apiUrl = `${API_BASE_URL}??${queryTotal ? queryTotal + '&' : ''}&populate=*`;
            console.log('Query Total Construida:', queryTotal);
            console.log('URL de la API a llamar:', apiUrl);
            
            console.log('API URL FINAL:', apiUrl);

            try {
                const respuesta = await fetch(apiUrl);
                if (!respuesta.ok) {
                    throw new Error(`Error HTTP: ${respuesta.status}`);
                }
                const datos = await respuesta.json();
                setInmuebles(datos.data);
            } catch (err) {
                console.error("Error al obtener inmuebles:", err);
                setError(`Error: No se pudo cargar el listado (${err.message}).`);
            } finally {
                setCargando(false);
            }
        };

        obtenerInmuebles();
    // Dependencias
    }, [tipoOperacion, filtroAvanzadoQuery]);

    // --- FUNCIÓN RECIBIDA DESDE EL HIJO (FiltrosBusqueda) ---
    const aplicarFiltrosAvanzados = (query) => {
        // Al actualizar este estado, el useEffect se dispara
        setFiltroAvanzadoQuery(query);
    };

     
    return (
        <div className="container mx-auto p-4 md:p-8">
            
            {/* 1. COMPONENTE DE FILTROS AVANZADOS */}
            <FiltrosBusqueda onFiltrosAplicados={aplicarFiltrosAvanzados} /> 
            
            {/* 2. COMPONENTE DE PRESENTACIÓN (LISTADO) */}
            <Propiedades // Usamos el nombre que tienes definido
                inmuebles={inmuebles}
                cargando={cargando}
                error={error}
                tipoOperacion={tipoOperacion}
            /> 
        </div>
    );
}

export default PropContainer