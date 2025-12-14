import FunContacto from "./FunContacto"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"

const DatosPropiedad = ({disponible, valor, moneda, tipoOperacion, Ubicacion}) => {

const whatsappLink = FunContacto(Ubicacion)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary-blue">
                            <p className="text-3xl font-extrabold text-primary-blue my-2">{moneda}{valor}</p>
                            <p className="text-sm text-gray-500">Valor de {tipoOperacion}</p>
                            {disponible ? (
                                <p className="text-green-600 font-semibold mt-3 flex items-center"><FaCheckCircle className="mr-2"/> Disponible</p>
                            ) : (
                                <p className="text-red-600 font-semibold mt-3 flex items-center"><FaTimesCircle className="mr-2"/> No Disponible</p>
                            )}
                            <button  className="w-full mt-4 bg-gray-500 hover:bg-blue-900 text-white font-bold py-2 rounded transition">
                                <a href={whatsappLink}>Contactar por esta propiedad</a>
                            </button>
                        </div>
    
  )
}

export default DatosPropiedad