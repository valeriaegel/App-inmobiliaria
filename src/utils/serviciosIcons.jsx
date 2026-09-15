import {
    FaTint,
    FaBolt,
    FaFire,
    FaWifi,
    FaTv,
    FaCar,
    FaSwimmingPool,
    FaShieldAlt,
    FaTree,
    FaCheckCircle,
    FaSnowflake,
    FaUtensils,
    FaBuilding
} from 'react-icons/fa';

/**
 * Retorna un icono contextualizado según el nombre del servicio o instalación.
 */
export function obtenerIconoServicio(nombre = '') {
    const n = nombre.toLowerCase().trim();

    if (n.includes('agua') || n.includes('cloaca') || n.includes('desagüe')) {
        return <FaTint className="text-sky-500 shrink-0 text-base" />;
    }
    if (n.includes('luz') || n.includes('electric') || n.includes('energ')) {
        return <FaBolt className="text-amber-500 shrink-0 text-base" />;
    }
    if (n.includes('gas')) {
        return <FaFire className="text-orange-500 shrink-0 text-base" />;
    }
    if (n.includes('internet') || n.includes('wifi') || n.includes('wi-fi')) {
        return <FaWifi className="text-indigo-500 shrink-0 text-base" />;
    }
    if (n.includes('cable') || n.includes('tv') || n.includes('tele')) {
        return <FaTv className="text-blue-500 shrink-0 text-base" />;
    }
    if (n.includes('cochera') || n.includes('garage') || n.includes('auto') || n.includes('estacionamiento')) {
        return <FaCar className="text-emerald-600 shrink-0 text-base" />;
    }
    if (n.includes('pileta') || n.includes('piscina')) {
        return <FaSwimmingPool className="text-cyan-500 shrink-0 text-base" />;
    }
    if (n.includes('seguridad') || n.includes('alarma') || n.includes('vigilancia') || n.includes('camara')) {
        return <FaShieldAlt className="text-purple-500 shrink-0 text-base" />;
    }
    if (n.includes('jardin') || n.includes('jardín') || n.includes('parque') || n.includes('patio') || n.includes('verde')) {
        return <FaTree className="text-emerald-500 shrink-0 text-base" />;
    }
    if (n.includes('aire') || n.includes('acondicionado') || n.includes('climatiz')) {
        return <FaSnowflake className="text-sky-400 shrink-0 text-base" />;
    }
    if (n.includes('parrilla') || n.includes('asador') || n.includes('quincho')) {
        return <FaUtensils className="text-amber-600 shrink-0 text-base" />;
    }
    if (n.includes('ascensor') || n.includes('elevador')) {
        return <FaBuilding className="text-slate-600 shrink-0 text-base" />;
    }

    return <FaCheckCircle className="text-[#0F766E] shrink-0 text-base" />;
}
