
const FunContacto = (Ubicacion) => {
    // Número de WhatsApp para contacto
    const whatsappNumber = '5493442666333'; 

    const subject = `Consulta Inmobiliaria`;
    const body = `
      Hola, tengo una consulta sobre la propiedad ubicada en ${Ubicacion}.
       `.trim(); 
    const whatsappBody = `*${subject}*%0A${encodeURIComponent(body)}`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappBody}`;

    return whatsappLink;

};

export default FunContacto