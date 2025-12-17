import FiltrosBusqueda from "./FiltrosBusqueda";
import Propiedades from "./Propiedades";
import { useParams } from "react-router-dom";
import { useState, useContext, useMemo } from "react";
// Importamos el contexto que centraliza los datos
import { PropertyContext } from "../context/PropertyContext";

/*
 * Componente contenedor que ahora filtra localmente para mayor velocidad.
 */
function PropContainer() {
    const { tipoOperacion } = useParams();

    // 1. Consumimos los datos globales del Contexto
    const { allInmuebles, loading, error } = useContext(PropertyContext);

    // Estado para los filtros avanzados (se mantiene para la lógica de filtrado)
    const [filtroAvanzadoQuery, setFiltroAvanzadoQuery] = useState('');

    // 2. Lógica de Filtrado Local (Instantánea)
    // Usamos useMemo para que el filtrado solo se ejecute si cambian los datos o la URL
    const inmueblesFiltrados = useMemo(() => {
        if (!allInmuebles) return [];

        return allInmuebles.filter(inmueble => {
            // Filtro por Tipo de Operación (Venta / Alquiler)
            const coincideOperacion = inmueble.TipoOperacion?.toUpperCase() === tipoOperacion?.toUpperCase();

            // Nota: Aquí podrías expandir la lógica para filtrar localmente 
            // según los valores de 'filtroAvanzadoQuery' si decides no pedir al servidor.
            const cumpleFiltroAvanzado = filtroAvanzadoQuery ? true : true; 
            
            return coincideOperacion && cumpleFiltroAvanzado;
        });
    }, [allInmuebles, tipoOperacion, filtroAvanzadoQuery]);

    // 3. Función para recibir filtros del hijo
    const aplicarFiltrosAvanzados = (query) => {
        setFiltroAvanzadoQuery(query);
    };

    return (
        <div className="p-4 bg-[#F0F2ED]">
            
            {/* 1. COMPONENTE DE FILTROS */}
            <FiltrosBusqueda onFiltrosAplicados={aplicarFiltrosAvanzados} /> 
            
            {/* 2. COMPONENTE DE PRESENTACIÓN (LISTADO) */}
            <Propiedades 
                inmuebles={inmueblesFiltrados}
                cargando={loading}
                error={error}
                tipoOperacion={tipoOperacion}
            /> 
        </div>
    );
}

export default PropContainer;