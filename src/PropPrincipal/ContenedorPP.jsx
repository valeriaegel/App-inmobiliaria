import PorOperaciones from './PorOperaciones'
import { useState, useEffect } from 'react';
import PropRecientes from './PropRecientes'; 
import { fetchFromStrapi } from '../api';

const API_BASE_URL = `/api/inmuebles`;
const RECIENTES_QUERY = '?sort=publishedAt:desc&pagination[limit]=2';
const POPULATE_QUERY = '&populate[Imagenes][populate]=*'; 

function ContenedorPP() {
    const [propiedades, setPropiedades] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecientes = async () => {
            setCargando(true);
            try {
                const respuesta = await fetchFromStrapi(`${API_BASE_URL}${RECIENTES_QUERY}${POPULATE_QUERY}`);;
                if (!respuesta.ok) {
                    throw new Error(`Error HTTP: ${respuesta.status}`);
                }
                const datos = await respuesta.json();
                
                // setPropiedades con datos.data (formato Strapi)
                setPropiedades(datos.data);
            } catch (err) {
                console.error("Error al obtener propiedades recientes:", err);
                setError("No se pudieron cargar las propiedades destacadas.");
            } finally {
                setCargando(false);
            }
        };

        fetchRecientes();
    }, []);

    return (
        <section className="container mx-auto py-10 md:py-16 px-6">

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

   <div className="lg:col-span-1 justify-between content-center">
                    <div className="space-y-4 mb-6 content-center">                                        
                        {/* 1. Componente que renderiza los botones de navegación */}
                        <PorOperaciones />
                    </div>
                </div>

                <div className="lg:col-span-1 p-4">
                    {/* 2. Componente que renderiza las tarjetas de propiedades */}
                    <p className="text-2xl font-bold text-[#253E57] p-2 text-center">
                        Ultimos ingresos
                    </p>
                    <PropRecientes
                        propiedades={propiedades}
                        cargando={cargando}
                        error={error}
                    />
                </div>
            </div>
            
        </section>
    );
}

export default ContenedorPP;

