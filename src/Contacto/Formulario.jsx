import { useState } from 'react';
import InputField from './InputField';

/*
  * Componente de formulario de contacto que envía consultas vía WhatsApp.
*/

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
                
                // Mensaje a enviar en la consulta
                    const subject = `Consulta Inmobiliaria de ${name}`;
                    const body = `
                    Hola, mi nombre es ${name}.
                    Email: ${email}
                    Teléfono: ${phone}
                    Mi consulta es la siguiente:
                    ${message}
                    `.trim(); 

                    //Parámetros de WhatsApp
                    const whatsappNumber = '5493442666333'; 
                    const whatsappBody = `*${subject}*%0A${encodeURIComponent(body)}`;
                    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappBody}`;
                
                // Abrir en una nueva pestaña (el usuario deberá presionar Enviar en WhatsApp)
                window.open(whatsappLink, '_blank');

                    // Limpiar el formulario
                    setFormData({ name: '', email: '', phone: '', message: '' });
                };

                return (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Campos Nombre y Email*/}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Campo Nombre */}
                                <InputField
                                    label="Nombre y Apellido"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Nombre Apellido"
                                    type="text"
                                />
                                {/* Campo Email */}
                                <InputField
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="email@example.com"
                                    type="email"
                                />
                        </div>

                            {/* Campo Teléfono */}
                                <InputField
                                    label="Numero de teléfono"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="3442-123456"
                                    type="tel"
                                />

                            {/* Campo Mensaje */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mensaje
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-3 border border-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                        placeholder="Escriba su consulta aquí..."
                                        required
                                    ></textarea>
                                </div>
                                {/* Botón de Envío */}
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#253E57] hover:bg-[#9CB0B1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                                >
                                    Escriba su consulta
                                </button>
            </form>
    )
}

export default Formulario;
