import React from 'react'
import Bienvenida from './Bienvenida'
import Servicios from './Servicios' // Asegúrate de crear este archivo
import InformacionContacto from '../Informacion/informacionContacto'
import Contacto from '../Contacto/Contacto'


const Inicio = () => {
  return (
    <div>
    <Bienvenida />
    <Servicios />
    <InformacionContacto />
    <Contacto/>
  
    </div>
  )
}

export default Inicio