import { useState, useEffect } from "react";
import { fetchFromStrapi } from "../context/api";
import { PropertyContext } from "./PropertyContext";

const CACHE_KEY_INMUEBLES = "inmobiliaria_cache_inmuebles";
const CACHE_KEY_CIUDADES = "inmobiliaria_cache_ciudades";
const CACHE_KEY_TIPOS = "inmobiliaria_cache_tipos";

export const PropertyProvider = ({ children }) => {
    const [allInmuebles, setAllInmuebles] = useState([]);
    const [opcionesCiudades, setOpcionesCiudades] = useState([]);
    const [opcionesTipos, setOpcionesTipos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarTodo = async () => {
            // 1. Intentar cargar desde caché (sessionStorage) para renderizado instantáneo
            let tieneCache = false;
            try {
                const cachedInm = sessionStorage.getItem(CACHE_KEY_INMUEBLES);
                const cachedCiu = sessionStorage.getItem(CACHE_KEY_CIUDADES);
                const cachedTip = sessionStorage.getItem(CACHE_KEY_TIPOS);

                if (cachedInm && cachedCiu && cachedTip) {
                    setAllInmuebles(JSON.parse(cachedInm));
                    setOpcionesCiudades(JSON.parse(cachedCiu));
                    setOpcionesTipos(JSON.parse(cachedTip));
                    setLoading(false);
                    tieneCache = true;
                }
            } catch (e) {
                console.warn("Error al leer caché de sessionStorage", e);
            }

            if (!tieneCache) {
                setLoading(true);
            }

            setError(null);

            try {
                // 2. Petición optimizada a Strapi (populate específico de relaciones necesarias)
                const endpointInmuebles = "/api/inmuebles?populate[0]=ciudad&populate[1]=tipo_inmueble&populate[2]=Imagenes&populate[3]=servicios&sort[0]=createdAt:desc";

                const [resInm, resCiu, resTip] = await Promise.all([
                    fetchFromStrapi(endpointInmuebles),
                    fetchFromStrapi("/api/ciudads?fields[0]=Ciudad"),
                    fetchFromStrapi("/api/tipo-inmuebles?fields[0]=Tipo")
                ]);

                if (!resInm.ok || !resCiu.ok || !resTip.ok) {
                    throw new Error(`Error en servidor: ${resInm.status}`);
                }

                const [dataInm, dataCiu, dataTip] = await Promise.all([
                    resInm.json(), resCiu.json(), resTip.json()
                ]);

                const inmueblesData = dataInm.data || [];
                const ciudadesData = (dataCiu.data || []).map(i => ({ id: i.id, nombre: i.Ciudad }));
                const tiposData = (dataTip.data || []).map(i => ({ id: i.id, nombre: i.Tipo }));

                setAllInmuebles(inmueblesData);
                setOpcionesCiudades(ciudadesData);
                setOpcionesTipos(tiposData);

                // 3. Guardar en caché de sesión para accesos inmediatos futuros
                try {
                    sessionStorage.setItem(CACHE_KEY_INMUEBLES, JSON.stringify(inmueblesData));
                    sessionStorage.setItem(CACHE_KEY_CIUDADES, JSON.stringify(ciudadesData));
                    sessionStorage.setItem(CACHE_KEY_TIPOS, JSON.stringify(tiposData));
                } catch (e) {
                    console.warn("Error al guardar en sessionStorage", e);
                }
            } catch (err) {
                console.error("Error cargando datos globales:", err);
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