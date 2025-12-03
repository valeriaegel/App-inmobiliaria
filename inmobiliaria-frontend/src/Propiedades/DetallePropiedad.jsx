import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaRulerCombined, FaTag, FaBed, FaBath, FaHome, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const STRAPI_BASE_URL = 'http://localhost:1337';

const DEEP_POPULATE = 'populate[0]=Imagenes&populate[1]=ciudad&populate[2]=servicios&populate[3]=tipo_inmueble';

function DetallePropiedad() {
  const { documentId } = useParams();
    const [inmueble, setInmueble] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const API_URL = `${STRAPI_BASE_URL}/api/inmuebles/${documentId}?${DEEP_POPULATE}`;

        const obtenerDetalle = async () => {
            setCargando(true);
          
            try {
             const respuesta = await fetch(API_URL);
                if (!respuesta.ok) {
                    throw new Error(`Error HTTP: ${respuesta.status}`);
                }
          
                const datos = await respuesta.json();
              
                const objetoInmueble = datos.data;
                               
                // setInmueble ahora tiene el objeto completo: {id: 8, documentId: '...', Titulo: 'Prueba1', ...}
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

    const atributos = inmueble; // Atributos es el objeto principal de la propiedad
    const servicios = atributos.servicios|| []; // Servicios (comodidades)
    const ciudad = atributos.ciudad; // Ciudad relacionada
const tipoInmueble = atributos.tipo_inmueble;


    // Lógica para determinar la imagen principal
    const imagenPrincipalUrl = atributos.Imagenes?.[0]?.url 
                                ? `${STRAPI_BASE_URL}${atributos.Imagenes?.[2]?.url}`
                                : '/placeholder-image.jpg';
                                
    return (
        <div className="container mx-auto p-4 md:p-12 bg-[#F0F2ED]">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{atributos.Titulo}</h1>
            <p className="text-xl text-gray-600 mb-6 flex items-center space-x-2">
                <FaMapMarkerAlt />
                <span>{atributos.Ubicacion} {ciudad ? `— ${ciudad.Ciudad}` : ''}</span>
            </p>
            
                <p className="text-xl text-gray-600 mb-6 flex items-center space-x-2">
                <span>{tipoInmueble.Tipo} </span>
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Columna Izquierda: Galería y Descripción */}
                <div className="lg:col-span-2">
                    {/* Imagen Principal */}
                    <img src={imagenPrincipalUrl} alt={atributos.Titulo} className="w-200 h-150 object-cover rounded-lg shadow-lg mb-6"/>

                    {/* Galería (Muestra la primera imagen para simplificar, se puede mejorar con un carrusel) */}
                    <div className="flex space-x-3 overflow-x-auto mb-8">
                        {atributos.Imagenes?.data?.map((img, index) => (
                            <img 
                                key={index} 
                                src={`${STRAPI_BASE_URL}${img.attributes.url}`} 
                                alt={`Vista ${index + 1}`} 
                                className="h-20 w-auto object-cover rounded-md cursor-pointer hover:border-2 hover:border-primary-blue"
                            />
                        ))}
                    </div>

                    <h2 className="text-3xl font-bold mb-4 text-gray-800 border-b pb-2">Descripción</h2>
                    <p className="text-gray-700 leading-relaxed mb-8">{atributos.Descipcion}</p>
                </div>

                {/* Columna Derecha: Datos Clave y Comodidades */}
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
                        <button className="w-full mt-4 bg-gray-500 hover:bg-blue-900 text-white font-bold py-2 rounded transition">
                            Contactar por esta propiedad
                        </button>
                    </div>

                    {/* FICHA TÉCNICA */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Ficha Técnica</h3>
                        <ul className="space-y-2 text-gray-700 text-right">
                            <li className="flex justify-between items-center"><FaRulerCombined className="text-primary-blue"/>
                            <ul>
                               Superficie: <span>{atributos.SuperficieTotal} m²</span>
                            </ul>
                            </li>
                            <li className="flex justify-between items-center"><FaRulerCombined className="text-primary-blue"/> 
                              <ul>
                               Superficie Const.: <span>{atributos.SuperficieConstruida} m²</span>
                            </ul>
                            </li>
                            <li className="flex justify-between items-center"><FaHome className="text-primary-blue"/> 
                            <ul>
                               Ambientes:  <span>{atributos.Ambientes}</span>
                               </ul>
                               </li>
                            <li className="flex justify-between items-center"><FaBed className="text-primary-blue"/> 
                            <ul>
                                 Dormitorios: <span>{atributos.Dormitorios}</span>
                            </ul>
                            </li>
                            <li className="flex justify-between items-center"><FaBath className="text-primary-blue"/> 
                            <ul>
                             Baños: <span>{atributos.Banos}</span>
                            </ul>
                           </li>
                            
                        </ul>
                    </div>
                    
                    {/* COMODIDADES/SERVICIOS */}
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

                </div>
            </div>
        </div>
    );
}

export default DetallePropiedad;