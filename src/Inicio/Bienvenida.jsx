import React from 'react';

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
    <section className="h-[70vh] bg-brand-gray flex items-center justify-center p-4">
      
      {/* Contenedor principal para el contenido */}
      <div className=" text-center max-w-4xl">
        
        <div className="inline-block p-4 bg-brand-accent shadow-2xl rounded-lg mb-6">
          {/* Se recomienda usar la ruta real de tu logo */}
          <img 
            src={logoImage} 
            alt="Logo de la Inmobiliaria" 
            className="h-24 w-auto object-contain" 
          />
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-white mb-4 leading-tight">
         Bienvenidos a Inmobiliaria Cristina Eckerdt
        </h1>
        
        <p className="text-xl text-gray-900 mb-8 font-light">
         Te asesoramos en la venta y alquiler de inmuebles.
        </p>
        
  
      </div>
      
    </section>
  );
}

export default Bienvenida;