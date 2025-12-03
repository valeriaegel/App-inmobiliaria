import React from 'react';
import imagenInicio from '../assets/Inicio.jpg';
// Se puede pasar el logo como prop o importarlo directamente
// Por ahora, asumiremos que el logo está en src/assets/logo.png
import logoImage from '../assets/Logo.png'; // Asegúrate de tener la imagen ahí

/**
 * Componente de la sección de bienvenida (Hero Section).
 * Utiliza los colores de marca definidos en tailwind.config.js
 */

function Bienvenida() {
  return (
    // Estilos para la sección completa (viewport height) y centrado de contenido
    
    <section className="flex items-center justify-center p-4" style={{ backgroundImage: `url('${imagenInicio}')`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
     
      {/* Contenedor principal para el contenido */}
      <div className=" text-center max-w-4xl">
        
        <div className="inline-block p-4 bg-brand-accent shadow-2xl rounded-lg mb-6 bg-[#F0F2ED]">
          {/* Se recomienda usar la ruta real de tu logo */}
          <img 
            src={logoImage} 
            alt="Logo de la Inmobiliaria" 
            className="h-24 w-auto object-contain" 
          />
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#F0F2ED] mb-4 leading-tight ">
        Inmobiliaria Cristina Eckerdt
        </h1>
        
        <p className="text-xl text-[#F0F2ED] mb-8 font-light">
         Te asesoramos en la venta y alquiler de inmuebles.
        </p>
        
  
      </div>
      
    </section>
  );
}

export default Bienvenida;