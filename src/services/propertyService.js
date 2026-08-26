import { fetchFromStrapi } from '../context/api';

const CACHE_KEYS = {
    INMUEBLES: 'inmobiliaria_cache_inmuebles',
    CIUDADES: 'inmobiliaria_cache_ciudades',
    TIPOS: 'inmobiliaria_cache_tipos'
};

export const propertyService = {
    // 1. Obtener caché de sesión
    getCachedData() {
        try {
            const cachedInm = sessionStorage.getItem(CACHE_KEYS.INMUEBLES);
            const cachedCiu = sessionStorage.getItem(CACHE_KEYS.CIUDADES);
            const cachedTip = sessionStorage.getItem(CACHE_KEYS.TIPOS);

            if (cachedInm && cachedCiu && cachedTip) {
                return {
                    inmuebles: JSON.parse(cachedInm),
                    ciudades: JSON.parse(cachedCiu),
                    tipos: JSON.parse(cachedTip)
                };
            }
        } catch (e) {
            console.warn('[propertyService] Error al leer caché de sessionStorage', e);
        }
        return null;
    },

    // 2. Guardar en caché de sesión
    setCachedData(inmuebles, ciudades, tipos) {
        try {
            sessionStorage.setItem(CACHE_KEYS.INMUEBLES, JSON.stringify(inmuebles));
            sessionStorage.setItem(CACHE_KEYS.CIUDADES, JSON.stringify(ciudades));
            sessionStorage.setItem(CACHE_KEYS.TIPOS, JSON.stringify(tipos));
        } catch (e) {
            console.warn('[propertyService] Error al guardar en sessionStorage', e);
        }
    },

    // 3. Consultar datos globales en paralelo desde Strapi con payload optimizado
    async fetchGlobalData() {
        const endpointInmuebles = "/api/inmuebles?populate[0]=ciudad&populate[1]=tipo_inmueble&populate[2]=Imagenes&populate[3]=servicios&sort[0]=createdAt:desc&pagination[pageSize]=100";

        const [resInm, resCiu, resTip] = await Promise.all([
            fetchFromStrapi(endpointInmuebles),
            fetchFromStrapi("/api/ciudads?fields[0]=Ciudad&pagination[pageSize]=100"),
            fetchFromStrapi("/api/tipo-inmuebles?fields[0]=Tipo&pagination[pageSize]=100")
        ]);

        if (!resInm.ok || !resCiu.ok || !resTip.ok) {
            throw new Error(`Error en servidor: HTTP ${resInm.status}`);
        }

        const [dataInm, dataCiu, dataTip] = await Promise.all([
            resInm.json(), resCiu.json(), resTip.json()
        ]);

        const inmuebles = dataInm.data || [];
        const ciudades = (dataCiu.data || []).map(i => ({ id: i.id, nombre: i.Ciudad }));
        const tipos = (dataTip.data || []).map(i => ({ id: i.id, nombre: i.Tipo }));

        this.setCachedData(inmuebles, ciudades, tipos);

        return { inmuebles, ciudades, tipos };
    },

    // 4. Consultar detalle de un inmueble por documentId
    async fetchDetalleInmueble(documentId) {
        const res = await fetchFromStrapi(`/api/inmuebles/${documentId}?populate=*`);
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
        const datos = await res.json();
        return datos.data;
    }
};
