import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Propiedades from './ListadoPropiedades/Propiedades.jsx'; // Asegúrate de crear este archivo
// Importa el resto de componentes (Nosotros, Contacto, etc.)
import './index.css';
import Encabezado from './Encabezado.jsx';
import Inicio from './Inicio/Inicio.jsx';
import Servicios from './Inicio/Servicios.jsx'; // Asegúrate de crear este archivo
import Contacto from './Contacto/Contacto.jsx';
import Footer from './Footer.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Paso Clave 1: Envuelve toda la aplicación con Router */}
    <Router>
      {/* El Encabezado se mantiene FUERA de Routes para que se muestre en todas las páginas */}
      <Encabezado />
      
      {/* Paso Clave 2: Define las rutas con el componente Routes */}
      <Routes>
        {/* Ruta para el inicio: muestra el componente 'Inicio' (que era tu 'App') */}
        <Route path="/" element={<Inicio />} />
        
        {/* Ruta para Propiedades: Muestra el componente Propiedades */}
        <Route path="/propiedades/:tipoOperacion" element={<Propiedades />} />
        
        {/* Rutas para los demás enlaces  */}
      <Route path="/servicios" element={<Servicios />}/>
         {/* <Route path="/nosotros" element={<div>Contenido Nosotros</div>} /> */}
        <Route path="/contacto" element={<Contacto/>} /> 
      </Routes>
    <Footer />
    </Router>
  </StrictMode>,
);