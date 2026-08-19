/**
 * Genera el enlace directo a WhatsApp según la operación (Alquiler vs General)
 * y los detalles de la propiedad.
 */
export const generarLinkWhatsApp = (ubicacion, tipoOperacion, titulo) => {
    const isAlquiler = tipoOperacion && tipoOperacion.toLowerCase().includes('alquiler');
    const whatsappNumber = isAlquiler ? '5493442640929' : '5493442666333';
    const subject = isAlquiler ? 'Consulta sobre Alquiler' : 'Consulta Inmobiliaria';
    const nombreProp = titulo ? `"${titulo}"` : 'la propiedad';
    const ubicacionStr = ubicacion ? ` ubicada en ${ubicacion}` : '';
    
    const body = `Hola, tengo una consulta sobre ${nombreProp}${ubicacionStr}.`;
    const whatsappBody = `*${subject}*%0A${encodeURIComponent(body)}`;
    return `https://wa.me/${whatsappNumber}?text=${whatsappBody}`;
};
