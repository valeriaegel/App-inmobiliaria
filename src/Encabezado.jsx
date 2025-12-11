import { useState } from 'react';  // Permite añadir estado interno a componentes funcionales.
import './index.css'; 
import logoImage from './assets/Logo.png'; 
import { Link } from 'react-router-dom';

function Encabezado() {
    const [menuAbierto, setMenuAbierto] = useState(false); //Define el estado principal para la funcionalidad móvil.
    
    // Función para alternar el estado de menuAbierto
    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    // Definición de los enlaces de navegación para reutilización
    const navLinks = (
        //Clases responsivas. block para móvil (uno por linea), inline-block para escritorio (en = linea)
        <> 
            <Link to="/" className="block md:inline-block px-4 py-2 hover:bg-gray-100 md:hover:bg-transparent hover:text-primary-blue transition duration-200" onClick={toggleMenu}>
                 Inicio
            </Link>
            <Link to="/propiedades/Venta" className="block md:inline-block px-4 py-2 hover:bg-gray-100 md:hover:bg-transparent hover:text-primary-blue transition duration-200" onClick={toggleMenu}>
                 Ventas
            </Link>
            <Link to="/propiedades/Alquiler" className="block md:inline-block px-4 py-2 hover:bg-gray-100 md:hover:bg-transparent hover:text-primary-blue transition duration-200" onClick={toggleMenu}>
                 Alquileres
            </Link>
            <Link to="/Servicios" className="block md:inline-block px-4 py-2 hover:bg-gray-100 md:hover:bg-transparent hover:text-primary-blue transition duration-200" onClick={toggleMenu}>
                 Servicios
            </Link>
        </>
    );

    return (
       <header className="bg-[#F0F2ED] border-b border-gray-200 shadow-sm">   
            <div className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center"> {/**/}
                    {/* 1. Logo */}
                    <div className="flex items-center space-x-2 z-10"> 
                        <Link to="/" className="text-primary-blue text-3xl">
                            <img src={logoImage} alt="Logo de la Inmobiliaria" className="h-10 w-auto object-contain" />
                        </Link>
                    </div>
                    
                    {/* 2. Enlaces de Navegación (Desktop) . Hidden: Oculta el menú por defecto (en móvil).*/}
                    <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
                        {navLinks}
                    </nav>

                    {/* 3. Contenedor del Botón Consultar y Menú Hamburguesa */}
                    <div className="flex items-center space-x-4">
                        {/* Botón Consultar */}
                        <Link to="/Contacto">
                            <button className="bg-[#253E57] hover:bg-[#AAAAA8] text-[#A3C4C9] hover:text-[#253E57] font-semibold py-2 px-6 rounded-md transition duration-200 shadow-md">
                                Consultar 
                            </button>
                        </Link>
                        {/* Botón Hamburguesa (Móvil). md:hidden: Oculta en escritorio */}
                        <button 
                            className="p-2 md:hidden" 
                            onClick={toggleMenu}
                            aria-label="Toggle Menu"
                        >
                            {/* Icono de Hamburguesa, basado en el estado */}
                            {menuAbierto ? (
                                // Icono X (Cerrar)
                                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            ) : (
                                // Icono Hamburguesa (Abrir)
                                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            )}
                        </button>
                    </div>
                </div>

            </div>

            {/* 4. Menú Desplegable (Solo visible en Móvil y cuando 'menuAbierto' es true) */}
            {menuAbierto && (
                <nav className="md:hidden bg-[#F0F2ED] border-t border-gray-200 py-2">
                    <div className="flex flex-col space-y-1 text-gray-700 font-medium">
                        {navLinks}
                    </div>
                </nav>
            )}
        </header>
    );
}

export default Encabezado;