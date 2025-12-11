import { FaRulerCombined, FaHome, FaBed, FaBath } from 'react-icons/fa';

/*
  * Componente para mostrar la ficha técnica de una propiedad inmobiliaria.
  * Recibe las propiedades técnicas como props.
*/

const FichaTecnica = ({superficieTotal, superficieConstruida, ambientes, dormitorios, banos}) => {
  return (
     <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Ficha Técnica</h3>
                            <ul className="space-y-2 text-gray-700 text-right">
                                {superficieTotal  && (
                                 <li className="flex justify-between items-center"><FaRulerCombined className="text-primary-blue"/>
                                <span>Superficie Total: {superficieTotal} m²</span>
                                </li>
                                )}
                               {superficieConstruida > 0 && (
                                <li className="flex justify-between items-center"><FaRulerCombined className="text-primary-blue"/> 
                                <span>Superficie Const.: {superficieConstruida} m²</span>
                                </li>
                                )}
                                {ambientes != null && (
                                <li className="flex justify-between items-center"><FaHome className="text-primary-blue"/> 
                                <span>Ambientes: {ambientes}</span>
                                </li>
                                )}
                                {dormitorios != null && (
                                <li className="flex justify-between items-center"><FaBed className="text-primary-blue"/> 
                                <span>Dormitorios: {dormitorios}</span>
                                </li>
                                )}
                                {banos != null && (
                                <li className="flex justify-between items-center"><FaBath className="text-primary-blue"/> 
                                <span>Baños: {banos}</span>
                                </li>
                                )}
                            </ul>
                        </div>
                        
  )
}

export default FichaTecnica