import React from 'react'
import Bienvenida from './Bienvenida'
import Servicios from './Servicios' 
import InformacionContacto from '../Informacion/informacionContacto'
import Contacto from '../Contacto/Contacto'
import ContenedorPP from '../PropPrincipal/ContenedorPP'

/*
  * Componente principal de la página de inicio.
*/

const Inicio = () => {
  return (
    <div className='bg-[#F0F2ED]'>
    <Bienvenida />
    <ContenedorPP />
    <Servicios />
    <InformacionContacto />
    <Contacto/>
  
    </div>
  )
}

export default Inicio