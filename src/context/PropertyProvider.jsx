import { useState, useEffect } from "react";
import { PropertyContext } from "./PropertyContext";
import { propertyService } from "../services/propertyService";

export const PropertyProvider = ({ children }) => {
    const [allInmuebles, setAllInmuebles] = useState([]);
    const [opcionesCiudades, setOpcionesCiudades] = useState([]);
    const [opcionesTipos, setOpcionesTipos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarTodo = async () => {
            // 1. Intentar cargar desde caché para renderizado instantáneo
            const cached = propertyService.getCachedData();
            let tieneCache = false;

            if (cached) {
                setAllInmuebles(cached.inmuebles);
                setOpcionesCiudades(cached.ciudades);
                setOpcionesTipos(cached.tipos);
                setLoading(false);
                tieneCache = true;
            } else {
                setLoading(true);
            }

            setError(null);

            try {
                // 2. Consultar servicio API
                const data = await propertyService.fetchGlobalData();
                setAllInmuebles(data.inmuebles);
                setOpcionesCiudades(data.ciudades);
                setOpcionesTipos(data.tipos);
            } catch (err) {
                console.error("[PropertyProvider] Error al cargar datos globales:", err);
                if (!tieneCache) {
                    setError("No se pudieron cargar las propiedades. Si el servidor estaba inactivo, reintente en unos segundos.");
                }
            } finally {
                setLoading(false);
            }
        };

        cargarTodo();
    }, []);

    return (
        <PropertyContext.Provider value={{ allInmuebles, opcionesCiudades, opcionesTipos, loading, error }}>
            {children}
        </PropertyContext.Provider>
    );
};