import FiltrosBusqueda from "./FiltrosBusqueda";
import Propiedades from "./Propiedades";
import { useParams } from "react-router-dom";
import { useState, useContext, useMemo } from "react";
import { PropertyContext } from "../context/PropertyContext";

/*
 * Componente contenedor: Maneja el filtrado lógico en el cliente
 * para garantizar una respuesta instantánea.
 */
function PropContainer() {
    const { tipoOperacion } = useParams();

    // 1. Consumimos los datos globales y estados de carga del PropertyContext
    const { allInmuebles, loading, error } = useContext(PropertyContext);

    // Estado que almacena la query de filtros generada por FiltrosBusqueda
    const [filtroAvanzadoQuery, setFiltroAvanzadoQuery] = useState('');

    // 2. Lógica de Filtrado Local (useMemo evita cálculos innecesarios)
    const inmueblesFiltrados = useMemo(() => {
        if (!allInmuebles) return [];

        // Procesamos la query string para extraer los valores seleccionados
        const params = new URLSearchParams(filtroAvanzadoQuery);
        
        // Extraemos los IDs y valores (coincidiendo con las keys de FiltrosBusqueda)
        const ciudadId = params.get('filters[ciudad][id][$eq]');
        const tipoId = params.get('filters[tipo_inmueble][id][$eq]');
        const ambientesEq = params.get('filters[Ambientes][$eq]');
        const ambientesGte = params.get('filters[Ambientes][$gte]');

        return allInmuebles.filter(inmueble => {
            // A. Filtro por Operación (Venta / Alquiler desde la URL)
            const coincideOperacion = inmueble.TipoOperacion?.toUpperCase() === tipoOperacion?.toUpperCase();

            // B. Filtro por Ciudad (Compara IDs)
            const coincideCiudad = !ciudadId || inmueble.ciudad?.id?.toString() === ciudadId;

            // C. Filtro por Tipo de Inmueble (Compara IDs)
            const coincideTipo = !tipoId || inmueble.tipo_inmueble?.id?.toString() === tipoId;

            // D. Filtro por Ambientes (Lógica para número exacto o "5+")
            let coincideAmbientes = true;
            if (ambientesEq) {
                coincideAmbientes = inmueble.Ambientes?.toString() === ambientesEq;
            } else if (ambientesGte) {
                coincideAmbientes = inmueble.Ambientes >= parseInt(ambientesGte, 10);
            }

            // La propiedad debe cumplir todas las condiciones
            return coincideOperacion && coincideCiudad && coincideTipo && coincideAmbientes;
        });
    }, [allInmuebles, tipoOperacion, filtroAvanzadoQuery]);

    // 3. Función que recibe la actualización de filtros desde el hijo
    const aplicarFiltrosAvanzados = (query) => {
        setFiltroAvanzadoQuery(query);
    };

    return (
        <div className="p-4 bg-[#F0F2ED]">
            
            {/* Componente de Filtros: actualiza el estado local*/}
            <FiltrosBusqueda onFiltrosAplicados={aplicarFiltrosAvanzados} /> 
            
            {/* Listado de Propiedades: Recibe el array ya filtrado en milisegundos */}
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