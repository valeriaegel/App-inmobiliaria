
import './index.css'; // Asegúrate de que este archivo importe Tailwind
import logoImage from './assets/Logo.png'; // Asegúrate de tener la imagen ahí
import { Link } from 'react-router-dom';

function Encabezado() {
    return (
        // Contenedor principal del Encabezado: Fondo blanco, borde inferior sutil.
        <header className="bg-[#F0F2ED] border-b border-gray-200 shadow-sm">
            
            <div className="container mx-auto px-6 py-3"> 
                
                {/* Contenedor Flex principal: Logo a la izquierda, navegación al centro, botón a la derecha */}
                <div className="flex justify-between items-center">
                    
                    {/* 1. Logo/Marca (PropiedadPro con ícono) */}
                    <div className="flex items-center space-x-2">
                        {/* Ícono de Casa/Edificio (simulado con un emoji grande) */}
                        <span className="text-primary-blue text-3xl">
                            <img src={logoImage} alt="Logo de la Inmobiliaria" className="h-10 w-auto object-contain" />
                        </span>
 
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
                    <button className="bg-[#253E57] hover:bg-[#AAAAA8] text-[#A3C4C9] hover:text-[#253E57] font-semibold py-2 px-6 rounded-md transition duration-200 shadow-md">
                            Consultar 
                        </button>
    </Link>
                        
                    </div>
                </div>
            </div>
        
        </header>
    );
}

export default Encabezado;