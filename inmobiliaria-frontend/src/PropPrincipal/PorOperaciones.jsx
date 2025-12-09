import React from 'react'
import { Link } from 'react-router-dom'

function PorOperaciones (){
  return (
    <div>
     <p className="text-xl font-bold text-gray-700 mb-4 text-center">
        ¿Qué tipo de operación buscas?
     </p>
   
    <div className='flex justify-center gap-6 space-y-4 md:space-x-6 text-center'>
            <Link 
                        to="/propiedades/Venta" >
                    <button className="bg-[#253E57] hover:bg-[#AAAAA8] text-[#A3C4C9] hover:text-[#253E57] font-semibold py-2 px-6 rounded-md transition duration-200 shadow-md">
                            Propiedades en Venta 
                        </button>
         </Link>
            
            <Link 
                        to="/propiedades/Alquiler" >
                    <button className="bg-[#253E57] hover:bg-[#AAAAA8] text-[#A3C4C9] hover:text-[#253E57] font-semibold py-2 px-6 rounded-md transition duration-200 shadow-md ml-4">          
                           Propiedades en Alquiler
                        </button>
           </Link>
       

    </div>
     </div>
  )
}

export default PorOperaciones;