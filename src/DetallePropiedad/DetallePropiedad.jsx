import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel'; // Importación del Carrusel y sus estilos
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Estilos base del carrusel
import FichaTecnica from './FichaTecnica';
import DatosPropiedad from './DatosPropiedad';
import { fetchFromStrapi } from '../api';

/*
    * Componente para mostrar el detalle de una propiedad inmobiliaria.
*/
const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_BASE_URL;
const DEEP_POPULATE = 'populate[0]=Imagenes&populate[1]=ciudad&populate[2]=servicios&populate[3]=tipo_inmueble';

function DetallePropiedad() {
    const { documentId } = useParams();
    const [inmueble, setInmueble] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const API_URL = `/api/inmuebles/${documentId}?${DEEP_POPULATE}`;
        console.log("Fetching from URL:", API_URL);

        const obtenerDetalle = async () => {
            setCargando(true);
          
            try {
               const respuesta = await fetchFromStrapi(API_URL);
                if (!respuesta.ok) {
                    throw new Error(`Error HTTP: ${respuesta.status}`);
                }
                const datos = await respuesta.json();   
                const objetoInmueble = datos.data;
                setInmueble(objetoInmueble);
            } catch (err) {
                console.error("Error al obtener el detalle:", err);
                setError("No se pudo cargar el detalle de la propiedad.");
            } finally {
                setCargando(false);
            }
        };
        obtenerDetalle();
    }, [documentId]);
          
    // Manejo de estados
    if (cargando) return <div className="text-center p-20 text-xl">Cargando detalles de la propiedad...</div>;
    if (error) return <div className="text-center p-20 text-xl font-bold text-red-600">{error}</div>;
    if (!inmueble) return <div className="text-center p-20 text-xl">Propiedad no encontrada.</div>;

    const atributos = inmueble; 
    const servicios = atributos.servicios || []; // Mapeo de servicios
    const ciudad = atributos.ciudad.Ciudad; // Nombre ciudad relacionada
    const tipoInmueble = atributos.tipo_inmueble.Tipo; // Tipo de inmueble
    const imagenes = atributos.Imagenes || []; // Array de imágenes
    
   
    return (
        <div className=" mx-auto p-4 md:p-12 bg-[#F0F2ED]">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{atributos.Titulo}</h1>
            <p className="text-xl text-gray-600 mb-6 flex items-center space-x-2">
                <FaMapMarkerAlt />
                <span>{atributos.Ubicacion} {ciudad ? `— ${ciudad.Ciudad}` : ''}</span>
            </p>
            
                <p className="text-xl text-gray-600 mb-6 flex items-center space-x-2">
                <span>{tipoInmueble.Tipo} </span>
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna Izquierda: Carrusel de Imágenes y Descripción */}
                <div className="lg:col-span-2">
                    {/* IMPLEMENTACIÓN DEL CARRUSEL 🎠 */}
                    <div className="rounded-lg shadow-xl overflow-hidden mb-6">
                        {imagenes.length > 0 ? (
                            <Carousel 
                                showArrows={true} // Mostrar flechas de navegación
                                showThumbs={false} // Mostrar miniaturas
                                showStatus={false} // Ocultar el estado (ej: "1 de 5")
                                infiniteLoop={true} // Bucle infinito
                                autoPlay={false} // No autoejecutar
                                thumbWidth={100}
                            >
                                {imagenes.map((img) => (
                                    <div key={img.id}>
                                        <img 
                                            src={`${STRAPI_BASE_URL}${img.url}`} 
                                            alt={atributos.Titulo} 
                                            className="w-full h-[500px] object-cover" 
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        ) : (
                            <img src="/placeholder-image.jpg" alt="Sin imágenes" className="w-full h-[500px] object-cover" />
                        )}
                    </div>       
                    <h2 className="text-3xl font-bold mb-4 text-gray-800 border-b pb-2">Descripción</h2>
                    <p className="text-gray-700 leading-relaxed mb-8">{atributos.Descipcion}</p>
                </div>

                {/* Columna Derecha: Datos Clave y Comodidades*/}
                <div className="lg:col-span-1 space-y-6">
                    {/* PRECIO Y OPERACIÓN */}
                    <DatosPropiedad
                        disponible={atributos.Disponible}
                        valor={atributos.Valor}
                        tipoOperacion={atributos.TipoOperacion}
                        Ubicacion={atributos.Ubicacion}
                    />
                    {/* FICHA TÉCNICA */}
                    <FichaTecnica
                        superficieTotal={atributos.SuperficieTotal}
                        superficieConstruida={atributos.SuperficieConstruida}
                        ambientes={atributos.Ambientes}
                        dormitorios={atributos.Dormitorios}
                        banos={atributos.Banos}
                    />
                   
                    {/* COMODIDADES/SERVICIOS */}
                    {atributos.servicios && atributos.servicios.length > 0 &&(
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md ">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Servicios</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            {servicios.map(servicio => (
                                <span key={servicio.id} className="flex items-center text-gray-700">
                                    <FaCheckCircle className="text-green-500 mr-2" /> {servicio.Nombre}
                                </span>
                            ))}
                        </div>
                    </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default DetallePropiedad;



