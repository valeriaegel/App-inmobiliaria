import { useState } from 'react';
import InputField from './InputField';
import { FaWhatsapp, FaPaperPlane } from 'react-icons/fa';

const Formulario = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, phone, message } = formData;
        
        const subject = `Consulta Inmobiliaria de ${name}`;
        const body = `
Hola, mi nombre es ${name}.
Email: ${email}
Teléfono: ${phone}
Mi consulta es la siguiente:
${message}
        `.trim(); 

        const whatsappNumber = '5493442666333'; 
        const whatsappBody = `*${subject}*%0A${encodeURIComponent(body)}`;
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappBody}`;
        
        window.open(whatsappLink, '_blank');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label="Nombre y Apellido"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ingrese su nombre completo"
                    type="text"
                />
                <InputField
                    label="Correo Electrónico"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                    type="email"
                />
            </div>

            <InputField
                label="Número de Teléfono"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ingrese su número de teléfono con código de área"
                type="tel"
            />

            <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Mensaje / Consulta
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 text-sm focus:ring-2 focus:ring-[#0F766E] focus:bg-white outline-none transition-all placeholder-slate-400"
                    placeholder="Detalla tu consulta sobre compra, alquiler o tasación..."
                    required
                ></textarea>
            </div>

            <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl text-white font-bold text-base bg-gradient-to-r from-[#0F766E] to-[#0D9488] hover:from-[#0D9488] hover:to-[#0F766E] transition-all duration-300 transform hover:-translate-y-0.5"
            >
                <FaWhatsapp className="text-xl" />
                <span>Enviar Consulta por WhatsApp</span>
            </button>
        </form>
    );
}

export default Formulario;
