/**
 * Teléfonos oficiales de la inmobiliaria.
 * Se exportan para reutilizarlos en el encabezado, la ficha y los CTA.
 */
export const TELEFONOS = {
    ventas: {
        display: '3442 666333',
        tel: '+5493442666333',
        whatsapp: '5493442666333',
    },
    alquileres: {
        display: '3442 640929',
        tel: '+5493442640929',
        whatsapp: '5493442640929',
    },
};

export const esOperacionAlquiler = (tipoOperacion) =>
    Boolean(tipoOperacion && tipoOperacion.toLowerCase().includes('alquiler'));

export const obtenerTelefonoOperacion = (tipoOperacion) =>
    esOperacionAlquiler(tipoOperacion) ? TELEFONOS.alquileres : TELEFONOS.ventas;

/**
 * Genera el enlace directo a WhatsApp según la operación, los detalles de la
 * propiedad y la intención de la consulta.
 *
 * @param {string} ubicacion - Ubicación de la propiedad.
 * @param {string} tipoOperacion - Venta, Alquiler, etc.
 * @param {string} titulo - Título de la propiedad.
 * @param {'consulta'|'visita'|'similares'} intencion - Tipo de mensaje.
 */
export const generarLinkWhatsApp = (ubicacion, tipoOperacion, titulo, intencion = 'consulta') => {
    const telefono = obtenerTelefonoOperacion(tipoOperacion);
    const nombreProp = titulo ? `"${titulo}"` : 'la propiedad';
    const ubicacionStr = ubicacion ? ` ubicada en ${ubicacion}` : '';
    const urlPropiedad = typeof window !== 'undefined' ? window.location.href : '';

    let mensaje = `Hola, tengo una consulta sobre ${nombreProp}${ubicacionStr}.`;

    if (intencion === 'visita') {
        mensaje = `Hola, quisiera coordinar una visita a ${nombreProp}${ubicacionStr}.`;
    }

    if (intencion === 'similares') {
        mensaje = `Hola, vi que ${nombreProp}${ubicacionStr} no está disponible. ¿Podrían ofrecerme propiedades similares?`;
    }

    const cuerpo = [mensaje, urlPropiedad ? `Propiedad: ${urlPropiedad}` : '']
        .filter(Boolean)
        .join('\n\n');

    return `https://wa.me/${telefono.whatsapp}?text=${encodeURIComponent(cuerpo)}`;
};
