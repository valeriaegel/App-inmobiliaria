import FiltrosBusqueda from "./FiltrosBusqueda";
import Propiedades from "./Propiedades";
import { useParams, useSearchParams } from "react-router-dom";
import { useContext, useMemo } from "react";
import { PropertyContext } from "../context/PropertyContext";

/*
 * Componente contenedor: filtra en el cliente a partir de los parámetros
 * de la URL (tipo y ciudad), por lo que los filtros se aplican al instante.
 */
function PropContainer() {
    const { tipoOperacion } = useParams();
    const [searchParams] = useSearchParams();

    // 1. Consumimos los datos globales y estados de carga del PropertyContext
    const { allInmuebles, loading, error } = useContext(PropertyContext);

    const ciudadId = searchParams.get('ciudad') || '';
    const tipoId = searchParams.get('tipo') || '';

    // 2. Filtrado local (useMemo evita cálculos innecesarios)
    const inmueblesFiltrados = useMemo(() => {
        if (!allInmuebles) return [];

        return allInmuebles.filter(inmueble => {
            // A. Filtro por Operación (Venta / Alquiler desde la URL)
            const coincideOperacion = inmueble.TipoOperacion?.toUpperCase() === tipoOperacion?.toUpperCase();

            // B. Filtro por Ciudad (compara IDs)
            const coincideCiudad = !ciudadId || String(inmueble.ciudad?.id) === ciudadId;

            // C. Filtro por Tipo de Inmueble (compara IDs)
            const coincideTipo = !tipoId || String(inmueble.tipo_inmueble?.id) === tipoId;

            return coincideOperacion && coincideCiudad && coincideTipo;
        });
    }, [allInmuebles, tipoOperacion, ciudadId, tipoId]);

    return (
        <div className="bg-[#F0F2ED] px-4 py-8 md:px-8">
            {/* Componente de Filtros: lee y actualiza los parámetros de la URL */}
            <FiltrosBusqueda />

            {/* Listado de Propiedades: recibe el array ya filtrado */}
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
