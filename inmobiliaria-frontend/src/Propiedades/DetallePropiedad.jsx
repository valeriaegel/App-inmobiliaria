import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaRulerCombined, FaTag, FaBed, FaBath, FaHome, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
// Importación del Carrusel y sus estilos
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Estilos base del carrusel

const STRAPI_BASE_URL = 'http://localhost:1337';

const DEEP_POPULATE = 'populate[0]=Imagenes&populate[1]=ciudad&populate[2]=servicios&populate[3]=tipo_inmueble';

function DetallePropiedad() {
    const { documentId } = useParams();
    const [inmueble, setInmueble] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
   
              
        // 2. Parámetros de WhatsApp
        const whatsappNumber = '5493442666333'; 
      
    
    useEffect(() => {
        const API_URL = `${STRAPI_BASE_URL}/api/inmuebles/${documentId}?${DEEP_POPULATE}`;
        console.log("Fetching from URL:", API_URL);

        const obtenerDetalle = async () => {
            setCargando(true);
          
            try {
               const respuesta = await fetch(API_URL);
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

    const atributos = inmueble; // Accede a los atributos de Strapi
    const servicios = atributos.servicios || []; // Mapeo de servicios
    const ciudad = atributos.ciudad.Ciudad; // Ciudad relacionada
    const tipoInmueble = atributos.tipo_inmueble.Tipo; // Tipo de inmueble
    const imagenes = atributos.Imagenes || []; // Array de imágenes

       const subject = `Consulta Inmobiliaria`;
      const body = `
      Hola, tengo una consulta sobre la propiedad ubicada en ${atributos.Ubicacion}.
            `.trim(); 

      
        const whatsappBody = `*${subject}*%0A${encodeURIComponent(body)}`;
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappBody}`;

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
                
                {/* Columna Izquierda: Carrusel y Descripción */}
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
                                // Personaliza la apariencia del Carrusel para que se vea bien
                                thumbWidth={100}
                            >
                                {imagenes.map((img) => (
                                    <div key={img.id}>
                                        <img 
                                            src={`${STRAPI_BASE_URL}${img.url}`} 
                                            alt={atributos.Titulo} 
                                            className="w-full h-[500px] object-cover" // Ajusta la altura
                                        />
                                        {/* Puedes añadir una leyenda si lo deseas */}
                                        {/* <p className="legend">{img.attributes.caption}</p> */} 
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

                {/* Columna Derecha: Datos Clave y Comodidades (sin cambios importantes) */}
                <div className="lg:col-span-1 space-y-6">
                    
                    {/* PRECIO Y OPERACIÓN */}
                    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary-blue">
                        <p className="text-3xl font-extrabold text-primary-blue my-2">${atributos.Valor}</p>
                        <p className="text-sm text-gray-500">Valor de {atributos.TipoOperacion}</p>
                        {atributos.Disponible ? (
                            <p className="text-green-600 font-semibold mt-3 flex items-center"><FaCheckCircle className="mr-2"/> Disponible</p>
                        ) : (
                            <p className="text-red-600 font-semibold mt-3 flex items-center"><FaTimesCircle className="mr-2"/> No Disponible</p>
                        )}
                        <button  className="w-full mt-4 bg-gray-500 hover:bg-blue-900 text-white font-bold py-2 rounded transition">
                            <a href={whatsappLink}>Contactar por esta propiedad</a>
                        </button>
                    </div>

                    {/* FICHA TÉCNICA */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Ficha Técnica</h3>
                        <ul className="space-y-2 text-gray-700 text-right">
                            {atributos.SuperficieTotal  && (
                             <li className="flex justify-between items-center"><FaRulerCombined className="text-primary-blue"/>
                            <span>Superficie Total: {atributos.SuperficieTotal} m²</span>
                            </li>
                            )}
                           {atributos.SuperficieConstruida > 0 && (
                            <li className="flex justify-between items-center"><FaRulerCombined className="text-primary-blue"/> 
                            <span>Superficie Const.: {atributos.SuperficieConstruida} m²</span>
                            </li>
                            )}
                            {atributos.Ambientes ==! null && (
                            <li className="flex justify-between items-center"><FaHome className="text-primary-blue"/> 
                            <span>Ambientes: {atributos.Ambientes}</span>
                            </li>
                            )}
                            {atributos.Dormitorios ==! null && (
                            <li className="flex justify-between items-center"><FaBed className="text-primary-blue"/> 
                            <span>Dormitorios: {atributos.Dormitorios}</span>
                            </li>
                            )}
                            {atributos.Banos ==! null && (
                            <li className="flex justify-between items-center"><FaBath className="text-primary-blue"/> 
                            <span>Baños: {atributos.Banos}</span>
                            </li>
                            )}
                        </ul>
                    </div>
                    
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



