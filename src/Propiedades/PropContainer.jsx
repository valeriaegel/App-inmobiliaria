import FiltrosBusqueda from "./FiltrosBusqueda"
import Propiedades from "./Propiedades" // Asumo Propiedades = ListaPropiedades
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { fetchFromStrapi } from "../api";

/*
  * Componente contenedor que maneja la lógica y filtrado de propiedades.
*/
const API_BASE_URL = `/api/inmuebles`; 

function PropContainer () {

    const { tipoOperacion } = useParams(); 

    // --- ESTADOS PRINCIPALES ---
    const [inmuebles, setInmuebles] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Definición del estado y su setter ***
    const [filtroAvanzadoQuery, setFiltroAvanzadoQuery] = useState('');

    // --- LÓGICA DEL FETCH Y FILTRADO ---
    useEffect(() => {
        const obtenerInmuebles = async () => {
            setCargando(true);
            setError(null);
            // 1. Filtro de Operación (de la URL)
            const filtroOperacionQuery = tipoOperacion.toUpperCase()
                ?`filters[TipoOperacion][$eq]=${tipoOperacion.toUpperCase()}`
                : '';

            // 2. Combinación de Queries (Operación + Avanzado)
            const queries = [];
            if (filtroOperacionQuery) {
                queries.push(filtroOperacionQuery);
            }
            if (filtroAvanzadoQuery) {
                queries.push(filtroAvanzadoQuery); 
            }
            const queryTotal = queries.join('&');

            // 3. Construir la URL Final
            let apiUrl = `/api/inmuebles?${queryTotal ? queryTotal + '&' : ''}&populate=*`;
         
            try {
                const respuesta = await fetchFromStrapi(apiUrl);
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
    }, [tipoOperacion, filtroAvanzadoQuery]);

    // --- FUNCIÓN RECIBIDA DESDE EL HIJO (FiltrosBusqueda) ---
    const aplicarFiltrosAvanzados = (query) => {
        setFiltroAvanzadoQuery(query);
    };

    return (
        <div className=" p-4 bg-[#F0F2ED]">
            
            {/* 1. COMPONENTE DE FILTROS*/}
            <FiltrosBusqueda onFiltrosAplicados={aplicarFiltrosAvanzados} /> 
            
            {/* 2. COMPONENTE DE PRESENTACIÓN (LISTADO) */}
            <Propiedades 
                inmuebles={inmuebles}
                cargando={cargando}
                error={error}
                tipoOperacion={tipoOperacion}
            /> 
        </div>
    );
}

export default PropContainer