
import './index.css'; // Asegúrate de que este archivo importe Tailwind
import logoImage from './assets/Logo.png'; // Asegúrate de tener la imagen ahí
import { Link } from 'react-router-dom';
import Contacto from './Contacto/Contacto';

function Encabezado() {
    return (
        // Contenedor principal del Encabezado: Fondo blanco, borde inferior sutil.
        <header className="bg-white border-b border-gray-200 shadow-sm">
            
            <div className="container mx-auto px-6 py-3"> 
                
                {/* Contenedor Flex principal: Logo a la izquierda, navegación al centro, botón a la derecha */}
                <div className="flex justify-between items-center">
                    
                    {/* 1. Logo/Marca (PropiedadPro con ícono) */}
                    <div className="flex items-center space-x-2">
                        {/* Ícono de Casa/Edificio (simulado con un emoji grande) */}
                        <span className="text-primary-blue text-3xl">
                            <img src={logoImage} alt="Logo de la Inmobiliaria" className="h-10 w-auto object-contain" />
                        </span>
                        <a href="/" className="text-primary-blue text-xl font-bold tracking-tight">
                            Inmobiliaria Cristina Eckerdt
                        </a>
                    </div>
                    
                    {/* 2. Enlaces de Navegación Centrados */}
                    <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
                       <Link to="/" className="hover:text-primary-blue transition duration-200">
                            Inicio
                        </Link>
                       <Link to="/propiedades/Venta" className="hover:text-primary-blue transition duration-200">
                            Ventas
                        </Link>
                           <Link to="/propiedades/Alquiler" className="hover:text-primary-blue transition duration-200">
                            Alquileres
                        </Link>
                         <Link to="/Servicios" className="hover:text-primary-blue transition duration-200">
                            Servicios
                        </Link>
                    </nav>

                    <div>
                        <Link 
                        to="/Contacto" >
                    <button className="bg-primary-blue hover:bg-neutral-300 text-black font-semibold py-2 px-6 rounded-md transition duration-200 shadow-md">
                            Consultar Ahora
                        </button>
    </Link>
                        
                    </div>
                    
                    {/* (Opcional: Menú hamburguesa para móviles, que puedes añadir después) */}

                </div>
            </div>
            
            {/* Barra azul debajo del header para replicar la imagen */}
            <div className="bg-primary-blue h-1 w-full"></div>
        </header>
    );
}

export default Encabezado;