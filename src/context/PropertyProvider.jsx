import { useState, useEffect } from "react";
import { fetchFromStrapi } from "../context/api";
import { PropertyContext } from "./PropertyContext";

export const PropertyProvider = ({ children }) => {
    const [allInmuebles, setAllInmuebles] = useState([]);
    const [opcionesCiudades, setOpcionesCiudades] = useState([]);
    const [opcionesTipos, setOpcionesTipos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarTodo = async () => {
            setLoading(true);
            try {
                // Hacemos todas las peticiones en paralelo para ganar velocidad
                const [resInm, resCiu, resTip] = await Promise.all([
                    fetchFromStrapi("/api/inmuebles?populate=*"),
                    fetchFromStrapi("/api/ciudads?fields=Ciudad"),
                    fetchFromStrapi("/api/tipo-inmuebles?fields=Tipo")
                ]);

                const [dataInm, dataCiu, dataTip] = await Promise.all([
                    resInm.json(), resCiu.json(), resTip.json()
                ]);

                setAllInmuebles(dataInm.data);
                setOpcionesCiudades(dataCiu.data.map(i => ({ id: i.id, nombre: i.Ciudad })));
                setOpcionesTipos(dataTip.data.map(i => ({ id: i.id, nombre: i.Tipo })));
            } catch (error) {
                console.error("Error cargando datos globales:", error);
            } finally {
                setLoading(false);
            }
        };
        cargarTodo();
    }, []);

    return (
        <PropertyContext.Provider value={{ allInmuebles, opcionesCiudades, opcionesTipos, loading }}>
            {children}
        </PropertyContext.Provider>
    );
};